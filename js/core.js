/* Fonctions de données partagées par l'interface, l'aperçu et les exports. */
(() => {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const id = () => globalThis.crypto.randomUUID();
  const normal = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  const FONTS = ['Nunito Sans', 'Marelle Bâton', 'Marelle', 'OpenDyslexic', 'Fredoka', 'Playwrite FR Trad'];
  const ICONS = ['', 'circle', 'star', 'heart', 'sun', 'flower', 'triangle'];
  function defaultStyle() {
    return {
      lines: ['upper', 'original', 'original'].map((casing, i) => ({ enabled: i === 0, font: i === 2 ? FONTS[1] : FONTS[0], size: i === 2 ? 20 : 28, casing, color: '#202936', bold: i === 0, initialSize: 1, initialBold: false, initialColor: '#202936' })),
      initial: { enabled: false, size: 36, color: '#000091' },
      photo: { position: 'left', shape: 'rounded', size: 28 },
      background: { color: '#ffffff', groupColor: false, assetId: null, zoom: 1, x: 0, y: 0, opacity: 0.35 },
      border: { enabled: true, color: '#000091', width: 0.4, dashed: false, radius: 2 },
      icon: '', iconColor: '#000091'
    };
  }
  function createProject() {
    return {
      schemaVersion: 1, kind: 'etiquettes-maternelle', name: 'Ma classe', students: [],
      groups: [['Rouge','#c53030'],['Bleu','#2457b2'],['Vert','#18753c'],['Jaune','#e9bc35']].map(([name,color]) => ({id:id(),name,color,icon:'',style:{}})),
      style: defaultStyle(), resources: [], templates: [], copies: 1, order: 'list',
      layout: { paper: 'A4', orientation: 'portrait', mode: 'dimensions', width: 70, height: 37, columns: 2, rows: 7, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, gapX: 3, gapY: 3, offsetX: 0, offsetY: 0, excluded: [], cutMarks: false }
    };
  }
  function newStudent(name) {
    return { id: id(), name, groupId: null, copies: null, photoId: null, crop: { zoom: 1, x: 0, y: 0 }, style: {} };
  }
  function reconcileNames(students, names) {
    if (names.length > 300) throw Error('La classe est limitée à 300 élèves.');
    const pools = new Map();
    for (const s of students) { const key = s.name.trim(); if (!pools.has(key)) pools.set(key, []); pools.get(key).push(s); }
    return names.map(raw => {
      const name = raw.trim();
      if (!name || name.length > 100) throw Error('Un prénom doit contenir de 1 à 100 caractères.');
      return pools.get(name)?.shift() || newStudent(name);
    });
  }
  function merge(base, patch) {
    if (Array.isArray(base)) return base.map((v,i) => merge(v, patch?.[i]));
    if (base && typeof base === 'object') return Object.fromEntries(Object.entries(base).map(([k,v]) => [k, merge(v, patch?.[k])]));
    return patch === undefined ? base : patch;
  }
  function resolveStyle(project, student) {
    const group = project.groups.find(g => g.id === student.groupId);
    const groupStyle = clone(group?.style || {});
    if (group?.icon && groupStyle.icon === undefined) { groupStyle.icon = group.icon; groupStyle.iconColor = group.color; }
    const style = merge(merge(project.style, groupStyle), student.style);
    if (style.background.groupColor && group) style.background.color = group.color;
    return style;
  }
  function computeLayout(l) {
    const paper = l.orientation === 'portrait' ? {w:210,h:297} : {w:297,h:210};
    const usableW = paper.w - l.marginLeft - l.marginRight;
    const usableH = paper.h - l.marginTop - l.marginBottom;
    let {width,height,columns,rows} = l;
    if (l.mode === 'dimensions') {
      columns = Math.floor((usableW + l.gapX + 1e-8) / (width + l.gapX));
      rows = Math.floor((usableH + l.gapY + 1e-8) / (height + l.gapY));
    } else {
      width = (usableW - (columns - 1) * l.gapX) / columns;
      height = (usableH - (rows - 1) * l.gapY) / rows;
    }
    if (!(width >= 5 && height >= 5 && columns >= 1 && rows >= 1) || columns*rows > 600) throw Error('Les étiquettes ne tiennent pas sur la feuille. Ajustez dimensions, marges ou grille.');
    const lastX = l.marginLeft + l.offsetX + (columns - 1) * (width + l.gapX) + width;
    const lastY = l.marginTop + l.offsetY + (rows - 1) * (height + l.gapY) + height;
    if (l.marginLeft + l.offsetX < 0 || l.marginTop + l.offsetY < 0 || lastX > paper.w + 1e-6 || lastY > paper.h + 1e-6) throw Error('Le décalage de calibration fait sortir la grille de la feuille.');
    return {...paper,width,height,columns,rows,capacity:columns*rows};
  }
  function orderedStudents(project) {
    const list = [...project.students];
    if (project.order === 'alpha') list.sort((a,b) => a.name.localeCompare(b.name, 'fr'));
    if (project.order === 'group') list.sort((a,b) => {
      const index = s => { const i = project.groups.findIndex(g => g.id === s.groupId); return i < 0 ? project.groups.length : i; };
      return index(a) - index(b) || a.name.localeCompare(b.name, 'fr');
    });
    return list;
  }
  function labelItems(project) {
    const items = orderedStudents(project).flatMap(s => Array.from({length:s.copies ?? project.copies}, (_,copy) => ({student:s,copy})));
    if (items.length > 3000) throw Error('Limitez la série à 3 000 étiquettes.');
    return items;
  }
  function paginate(project) {
    const l = computeLayout(project.layout), excluded = new Set(project.layout.excluded);
    if (excluded.size >= l.capacity) throw Error('Toutes les cases de la première feuille sont exclues.');
    const items = labelItems(project); const pages = []; let cursor = 0;
    while (cursor < items.length) {
      const page = [];
      for (let slot=0;slot<l.capacity && cursor<items.length;slot++) {
        if (pages.length === 0 && excluded.has(slot)) continue;
        page.push({...items[cursor++],slot,x:project.layout.marginLeft + project.layout.offsetX + (slot%l.columns)*(l.width+project.layout.gapX),y:project.layout.marginTop + project.layout.offsetY + Math.floor(slot/l.columns)*(l.height+project.layout.gapY)});
      }
      pages.push(page);
      if (pages.length > 100) throw Error('Limitez le projet à 100 pages.');
    }
    return pages;
  }
  function parseCSV(text) {
    // Le parseur autonome accepte guillemets, échappement et retours à la ligne.
    const src = text.replace(/^\uFEFF/, '');
    const first = src.split(/\r?\n/)[0];
    const separator = first.includes(';') ? ';' : first.includes('\t') ? '\t' : ',';
    const rows = []; let row=[], cell='', quoted=false;
    for(let i=0;i<src.length;i++) {
      const char=src[i];
      if(char==='"') { if(quoted && src[i+1]==='"') {cell+='"';i++;} else quoted=!quoted; }
      else if(char===separator && !quoted) {row.push(cell.trim());cell='';}
      else if((char==='\n'||char==='\r')&&!quoted) { if(char==='\r'&&src[i+1]==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell=''; }
      else cell+=char;
    }
    if(quoted) throw Error('Guillemet non fermé dans le CSV.');
    row.push(cell.trim());if(row.some(Boolean))rows.push(row);
    if(!rows.length) return [];
    const headers=rows[0].map(normal), ni=headers.findIndex(h => ['prenom','name','nom','prénoms'].includes(h));
    const gi=headers.indexOf('groupe'), ci=headers.findIndex(h => ['exemplaires','quantite','copies'].includes(h));
    const records=(ni<0?rows:rows.slice(1)).map(r => {
      const name=r[ni<0?0:ni]; const copies=ci>=0 && r[ci] ? Number(r[ci]) : null;
      if(!name||name.length>100 || (copies!==null&&(!Number.isInteger(copies)||copies<1||copies>50))) throw Error('CSV invalide : prénom manquant ou exemplaires hors de 1 à 50.');
      return {name,group:gi>=0?r[gi]||'':'',copies};
    });
    if(records.length>300) throw Error('Le CSV est limité à 300 élèves.');
    return records;
  }
  function exportTemplate(project) {
    const style = clone(project.style); style.background.assetId = null;
    return {schemaVersion:1,kind:'etiquettes-modele',name:'Modèle partagé',style,layout:{...clone(project.layout),excluded:[]}};
  }
  function pruneResources(project) {
    const used=new Set(project.students.map(s=>s.photoId).filter(Boolean));
    for(const style of [project.style,...project.groups.map(g=>g.style),...project.students.map(s=>s.style),...project.templates.map(t=>t.style)])if(style.background?.assetId)used.add(style.background.assetId);
    project.resources=project.resources.filter(r=>used.has(r.id));
    return project;
  }
  const object = v => v && typeof v === 'object' && !Array.isArray(v);
  function check(condition,message) {if(!condition)throw Error(message);}
  function number(v,min,max,integer=false) {check(typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max&&(!integer||Number.isInteger(v)),'Valeur numérique invalide.');}
  function string(v,max=100) {check(typeof v==='string'&&v.length<=max,'Texte invalide.');}
  function color(v) {check(typeof v==='string'&&/^#[\da-f]{6}$/i.test(v),'Couleur invalide.');}
  function validateStyle(input,partial=false) {
    check(object(input),'Réglages invalides.');
    const defaults=defaultStyle();
    check(Object.keys(input).every(k => Object.hasOwn(defaults,k)), 'Réglage inconnu.');
    const result=clone(input);
    function fields(value, schema) {
      check(object(value),'Réglages invalides.');
      check(Object.keys(value).every(k=>Object.hasOwn(schema,k)), 'Propriété inconnue.');
      for(const [key,validate] of Object.entries(schema)) {
        if(value[key]!==undefined)validate(value[key]); else check(partial,'Propriété manquante.');
      }
    }
    const bool=v=>check(typeof v==='boolean','Option invalide.');
    const en=options=>v=>check(options.includes(v),'Choix invalide.');
    if(input.lines!==undefined) {
      check(Array.isArray(input.lines)&&input.lines.length<=3&&(partial||input.lines.length===3),'Écritures invalides.');
      input.lines.forEach(line=>fields(line,{enabled:bool,font:en(FONTS),size:v=>number(v,6,100),casing:en(['upper','lower','title','original']),color,bold:bool,initialSize:v=>number(v,1,3),initialBold:bool,initialColor:color}));
    }
    const schemas={initial:{enabled:bool,size:v=>number(v,6,100),color},photo:{position:en(['left','right','top']),shape:en(['square','rectangle','circle','rounded']),size:v=>number(v,5,80)},background:{color,groupColor:bool,assetId:v=>check(v===null||(typeof v==='string'&&v.length<100),'Image invalide.'),zoom:v=>number(v,1,5),x:v=>number(v,-1,1),y:v=>number(v,-1,1),opacity:v=>number(v,0,1)},border:{enabled:bool,color,width:v=>number(v,0.1,3),dashed:bool,radius:v=>number(v,0,20)}};
    for(const [key,schema] of Object.entries(schemas))if(input[key]!==undefined)fields(input[key],schema);
    if(input.icon!==undefined)en(ICONS)(input.icon);
    if(input.iconColor!==undefined)color(input.iconColor);
    if(!partial)check(Object.keys(defaults).every(k=>input[k]!==undefined),'Réglages incomplets.');
    return result;
  }
  function validateLayout(input) {
    check(object(input),'Mise en page invalide.');
    const d=createProject().layout;
    check(Object.keys(input).every(k=>Object.hasOwn(d,k))&&Object.keys(d).every(k=>input[k]!==undefined),'Mise en page incomplète.');
    check(input.paper==='A4'&&['portrait','landscape'].includes(input.orientation)&&['dimensions','grid'].includes(input.mode),'Papier invalide.');
    for(const k of ['width','height'])number(input[k],5,297);
    for(const k of ['columns','rows'])number(input[k],1,30,true);
    for(const k of ['marginTop','marginBottom','marginLeft','marginRight','gapX','gapY'])number(input[k],0,100);
    for(const k of ['offsetX','offsetY'])number(input[k],-20,20);
    check(typeof input.cutMarks==='boolean'&&Array.isArray(input.excluded)&&input.excluded.length<=600,'Grille invalide.');
    input.excluded.forEach(v=>number(v,0,599,true));
    check(new Set(input.excluded).size===input.excluded.length,'Cases répétées.');
    return clone(input);
  }
  function validateTemplate(data) {
    check(object(data)&&data.schemaVersion===1&&data.kind==='etiquettes-modele','Modèle incompatible.');
    string(data.name); const style=validateStyle(data.style);check(style.background.assetId===null,'Le modèle ne doit contenir aucune image personnelle.');
    return {schemaVersion:1,kind:data.kind,name:data.name,style,layout:validateLayout(data.layout)};
  }
  function validateProject(data) {
    check(object(data)&&data.schemaVersion===1&&data.kind==='etiquettes-maternelle','Projet incompatible ou version inconnue.');
    string(data.name); number(data.copies,1,50,true); check(['list','alpha','group'].includes(data.order),'Ordre invalide.');
    const style=validateStyle(data.style),layout=validateLayout(data.layout);
    check(Array.isArray(data.students)&&data.students.length<=300&&Array.isArray(data.groups)&&data.groups.length<=30&&Array.isArray(data.resources)&&data.resources.length<=650&&Array.isArray(data.templates)&&data.templates.length<=50,'Projet trop grand ou incomplet.');
    const resourceIds=new Set(),groupIds=new Set(),studentIds=new Set();
    const resources=data.resources.map(r=>{check(object(r),'Image invalide.');string(r.id);string(r.name,200);check(!resourceIds.has(r.id),'Image dupliquée.');resourceIds.add(r.id);check(typeof r.data==='string'&&r.data.length<=15000000&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(r.data),'Image invalide : seules les images intégrées sont admises.');return {id:r.id,name:r.name,data:r.data};});
    check(resources.reduce((size,r)=>size+r.data.length,0)<=70000000,'Les images du projet dépassent la limite de 70 Mo encodés. Réduisez la taille des images.');
    const groups=data.groups.map(g=>{string(g.id);string(g.name);check(!groupIds.has(g.id),'Groupe dupliqué.');groupIds.add(g.id);color(g.color);check(ICONS.includes(g.icon),'Icône invalide.');return {id:g.id,name:g.name,color:g.color,icon:g.icon,style:validateStyle(g.style,true)};});
    function checkAsset(s) {check(!s.background?.assetId||resourceIds.has(s.background.assetId),'Image de fond absente du projet.');}
    checkAsset(style);groups.forEach(g=>checkAsset(g.style));
    const students=data.students.map(s=>{
      string(s.id);string(s.name);check(s.name.trim().length>0&&!studentIds.has(s.id),'Élève invalide ou dupliqué.');studentIds.add(s.id);
      check(s.groupId===null||groupIds.has(s.groupId),'Groupe inconnu.');check(s.photoId===null||resourceIds.has(s.photoId),'Photo absente.');
      if(s.copies!==null)number(s.copies,1,50,true);
      check(object(s.crop),'Recadrage invalide.');number(s.crop.zoom,1,5);number(s.crop.x,-1,1);number(s.crop.y,-1,1);
      const ss=validateStyle(s.style,true);checkAsset(ss);
      return {id:s.id,name:s.name,groupId:s.groupId,copies:s.copies,photoId:s.photoId,crop:{zoom:s.crop.zoom,x:s.crop.x,y:s.crop.y},style:ss};
    });
    const templates=data.templates.map(t=>{string(t.id);string(t.name);const ts=validateStyle(t.style);checkAsset(ts);return {id:t.id,name:t.name,style:ts,layout:validateLayout(t.layout)};});
    const result={schemaVersion:1,kind:data.kind,name:data.name,students,groups,style,resources,templates,copies:data.copies,order:data.order,layout};
    labelItems(result);return result;
  }
  globalThis.LabelCore={clone,id,normal,FONTS,ICONS,defaultStyle,createProject,newStudent,reconcileNames,merge,resolveStyle,computeLayout,orderedStudents,labelItems,paginate,parseCSV,exportTemplate,pruneResources,validateStyle,validateLayout,validateTemplate,validateProject};
})();
