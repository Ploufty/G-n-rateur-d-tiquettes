import test from 'node:test';
import assert from 'node:assert/strict';
import '../js/core.js';
const C = globalThis.LabelCore;

test('conserve identités, photos et groupes lors du tri et des homonymes', () => {
  const p = C.createProject();
  p.students = C.reconcileNames([], ['Zoé', 'Léna', 'Zoé']);
  p.students[0].photoId = 'portrait'; p.students[0].groupId = p.groups[0].id;
  const first = p.students[0].id;
  p.students = C.reconcileNames(p.students, ['Léna', 'Zoé', 'Zoé', 'Malo']);
  assert.equal(p.students[1].id, first);
  assert.equal(p.students[1].photoId, 'portrait');
  assert.equal(new Set(p.students.map(s => s.id)).size, 4);
});
test('hérite propriété par propriété et par ligne', () => {
  const p = C.createProject(); const s = C.newStudent('Léna');
  s.groupId = p.groups[0].id;
  p.groups[0].style = { lines: [{ color: '#ff0000', size: 28 }] };
  s.style = { lines: [{ size: 35 }] };
  const style = C.resolveStyle(p, s);
  assert.equal(style.lines[0].color, '#ff0000');
  assert.equal(style.lines[0].size, 35);
  assert.equal(style.lines[0].font, p.style.lines[0].font);
});
test('calcule grille A4, pagination et cases exclues sans déplacer la grille', () => {
  const p = C.createProject(); p.students = Array.from({length: 25}, (_,i) => C.newStudent(`Élève ${i}`));
  Object.assign(p.layout, { width: 70, height: 37, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, gapX: 0, gapY: 0, excluded: [0, 1] });
  const layout = C.computeLayout(p.layout); assert.equal(layout.capacity, 24);
  const pages = C.paginate(p);
  assert.equal(pages.length, 2); assert.equal(pages[0][0].slot, 2);
  assert.equal(pages[0].length, 22); assert.equal(pages[1][0].slot, 0);
});
test('refuse les formats impossibles et toutes les cases exclues', () => {
  const p = C.createProject(); p.layout.width = 300;
  assert.throws(() => C.computeLayout(p.layout));
  p.layout.width = 70; p.students = [C.newStudent('Léna')];
  p.layout.excluded = Array.from({ length: C.computeLayout(p.layout).capacity }, (_,i) => i);
  assert.throws(() => C.paginate(p));
});
test('le JSON est autonome et refuse liens distants, versions inconnues et quantités abusives', () => {
  const p = C.createProject(); p.students = [C.newStudent('Léna')];
  assert.deepEqual(C.validateProject(JSON.parse(JSON.stringify(p))), p);
  assert.throws(() => C.validateProject({...p, schemaVersion: 99}));
  p.resources = [{id:'x',name:'image',data:'https://example.org/photo.png'}];
  assert.throws(() => C.validateProject(p));
  p.resources = []; p.students[0].copies = -1;
  assert.throws(() => C.validateProject(p));
});
test('le modèle partagé ne contient ni élèves, ni photos, ni groupes personnels', () => {
  const p = C.createProject(); p.students = [C.newStudent('Secret')];
  p.resources = [{id:'x',name:'Secret.png',data:'data:image/png;base64,AAAA'}];
  p.style.background.assetId = 'x';
  p.templates = [{id:'t',name:'Secret',style:p.style,layout:p.layout}];
  const model = C.exportTemplate(p);
  const text = JSON.stringify(model);
  assert.ok(!text.includes('Secret')); assert.ok(!text.includes('AAAA'));
  assert.equal(model.style.background.assetId, null);
});
test('CSV avec accents, séparateur français, guillemets et quantité individuelle', () => {
  const students = C.parseCSV('Prénom;Groupe;Exemplaires\n"Léna";Rouge;2\n"Jean;Paul";Bleu;1');
  assert.equal(students[0].name,'Léna'); assert.equal(students[0].copies,2);
  assert.equal(students[1].name,'Jean;Paul');
  assert.throws(() => C.parseCSV('Prénom;Exemplaires\nMalo;-3'));
});
test('retire les ressources des élèves supprimés mais conserve celles des modèles personnels', () => {
  const p=C.createProject();p.resources=[{id:'photo'},{id:'fond'},{id:'ancien'}];
  const s=C.newStudent('Léna');s.photoId='photo';p.students=[s];
  const style=C.defaultStyle();style.background.assetId='fond';p.templates=[{id:'t',name:'Gabarit',style,layout:p.layout}];
  C.pruneResources(p);assert.deepEqual(p.resources.map(r=>r.id),['photo','fond']);
  p.students=[];C.pruneResources(p);assert.deepEqual(p.resources.map(r=>r.id),['fond']);
});
