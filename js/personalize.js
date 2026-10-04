(() => {
  'use strict';
  const C=globalThis.LabelCore,U=globalThis.LabelUI;
  const icons=[['','Aucun'],['circle','Rond'],['star','Étoile'],['heart','Cœur'],['sun','Soleil'],['flower','Fleur'],['triangle','Triangle']];
  function personalize(app) {
    const p=app.project;let student=p.students.find(s=>s.id===app.selectedStudent)||p.students[0];
    let target=p, effective=p.style;
    if(app.styleTarget.startsWith('group:')){target=p.groups.find(g=>g.id===app.styleTarget.slice(6))||p;effective=C.merge(p.style,target.style);}
    if(app.styleTarget.startsWith('student:')){target=p.students.find(s=>s.id===app.styleTarget.slice(8))||p;effective=target===p?p.style:C.resolveStyle(p,target);}
    let previewStudents=p.students;
    if(app.styleTarget.startsWith('group:')&&target!==p){previewStudents=p.students.filter(s=>s.groupId===target.id);student=previewStudents.find(s=>s.id===app.selectedStudent)||previewStudents[0];}
    if(app.styleTarget.startsWith('student:')&&target!==p){student=target;previewStudents=[target];}
    const update=(path,value)=>app.change(()=>U.setPath(target.style,path,path==='background.assetId'&&value===''?null:value));
    const control=(label,path,value,options)=>U.field(label,value,v=>update(path,v),options);
    const togg=(label,path,value)=>U.check(label,value,v=>update(path,v));
    const left=U.el('div');
    left.append(U.card('Appliquer les réglages',U.field('Personnaliser',app.styleTarget,v=>{app.styleTarget=v;if(v.startsWith('student:'))app.selectedStudent=v.slice(8);app.render();},{choices:[['common','Toute la classe'],...p.groups.map(g=>['group:'+g.id,'Groupe · '+g.name]),...p.students.map(s=>['student:'+s.id,'Élève · '+s.name])]}),target===p?U.notice('Ces réglages servent de base à toutes les étiquettes.'):U.notice('Seuls les réglages modifiés ici remplacent ceux hérités. Le reste suit la classe et le groupe.'),target===p?null:U.button('Revenir aux réglages hérités',()=>app.change(()=>target.style={}))));
    const lines=U.card('Les écritures');
    effective.lines.forEach((line,i)=>{
      const path=`lines.${i}.`,detail=U.el('details',i===0?{open:''}:{},U.el('summary',{},`${i+1} · ${['Capitales','Script','Cursive'][i]}`));
      detail.append(togg('Afficher cette ligne',path+'enabled',line.enabled));
      detail.append(U.el('div',{class:'fields'},control('Police',path+'font',line.font,{choices:C.FONTS}),control('Taille maximale (pt)',path+'size',line.size,{type:'number',min:6,max:100}),control('Casse',path+'casing',line.casing,{choices:[['upper','CAPITALES'],['title','Initiale majuscule'],['lower','minuscules'],['original','Respecter la saisie']]}),control('Couleur du texte',path+'color',line.color,{type:'color'})));
      detail.append(togg('Texte en gras',path+'bold',line.bold));
      if(app.advanced){detail.append(U.el('div',{class:'fields'},control('Agrandir l’initiale (×)',path+'initialSize',line.initialSize,{type:'number',min:1,max:3,step:.1}),control('Couleur de l’initiale',path+'initialColor',line.initialColor,{type:'color'})),togg('Initiale en gras',path+'initialBold',line.initialBold));}
      lines.append(detail);
    });
    lines.append(U.el('p',{class:'hint'},'La taille s’ajuste à chaque prénom pour tenir dans l’étiquette.'));
    left.append(lines);
    left.append(U.card('Grande initiale et pictogramme',togg('Grande initiale séparée au-dessus', 'initial.enabled',effective.initial.enabled),U.el('div',{class:'fields'},control('Taille de la grande initiale (pt)','initial.size',effective.initial.size,{type:'number',min:6,max:100}),control('Couleur de la grande initiale','initial.color',effective.initial.color,{type:'color'}),control('Pictogramme','icon',effective.icon,{choices:icons}),control('Couleur du pictogramme','iconColor',effective.iconColor,{type:'color'}))));
    const background=U.card('Fond de l’étiquette',U.el('div',{class:'fields'},control('Couleur unie','background.color',effective.background.color,{type:'color'}),control('Image de fond','background.assetId',effective.background.assetId||'',{choices:[['','Aucune'],...p.resources.map(r=>[r.id,r.name])]})),togg('Utiliser la couleur du groupe','background.groupColor',effective.background.groupColor));
    background.append(U.file('Importer un fond','image/png,image/jpeg,image/webp',async files=>{if(!files[0])return;const r=await U.readImage(files[0]);app.change(()=>{p.resources.push(r);U.setPath(target.style,'background.assetId',r.id);});}));
    if(effective.background.assetId)background.append(U.el('div',{class:'fields'},...cropFields(effective.background,(k,v)=>update('background.'+k,v)),control('Opacité','background.opacity',effective.background.opacity,{type:'range',min:0,max:1,step:.05})));
    left.append(background);
    left.append(U.card('Contour',togg('Afficher le contour','border.enabled',effective.border.enabled),U.el('div',{class:'fields'},control('Couleur du contour','border.color',effective.border.color,{type:'color'}),control('Épaisseur (mm)','border.width',effective.border.width,{type:'number',min:.1,max:3,step:.1}),control('Arrondi (mm)','border.radius',effective.border.radius,{type:'number',min:0,max:20,step:.5})),togg('Trait en pointillés','border.dashed',effective.border.dashed)));
    const right=U.el('div');
    const preview=U.card('Aperçu de l’étiquette',U.field('Élève affiché',student?.id||'',v=>{app.selectedStudent=v;app.render();},{choices:previewStudents.map(s=>[s.id,s.name])}),U.el('div',{class:'preview-stage',id:'label-preview'}),U.el('p',{class:'preview-caption'},'Le papier reste blanc, même en thème sombre.'));
    right.append(preview);
    if(student){
      const photo=p.resources.find(r=>r.id===student.photoId);
      const settings=U.card('Photo de '+student.name,U.file(photo?'Remplacer la photo':'Ajouter une photo','image/png,image/jpeg,image/webp',async files=>{if(!files[0])return;const r=await U.readImage(files[0]);app.change(()=>{p.resources.push(r);student.photoId=r.id;student.crop={zoom:1,x:0,y:0};});}),photo?U.button('Retirer la photo',()=>app.change(()=>student.photoId=null),'ghost danger'):null);
      if(photo){settings.append(U.el('img',{class:'portrait',src:photo.data,alt:'Photo de '+student.name}),U.el('div',{class:'fields'},...cropFields(student.crop,(k,v)=>app.change(()=>student.crop[k]=v))));}
      settings.append(U.el('div',{class:'fields'},control('Position des photos','photo.position',effective.photo.position,{choices:[['left','À gauche'],['right','À droite'],['top','Au-dessus']]}),control('Forme','photo.shape',effective.photo.shape,{choices:[['square','Carré'],['rectangle','Rectangle'],['circle','Rond'],['rounded','Coins arrondis']]}),control('Taille maximale (mm)','photo.size',effective.photo.size,{type:'number',min:5,max:80})),U.el('p',{class:'hint'},'Sans photo : aucun cadre vide. Le recadrage conserve le fichier original.'));
      right.append(settings);
    }
    right.append(U.notice('Les photos sont attachées aux élèves. Les réglages de forme et de position suivent la cible choisie à gauche.'));
    const result=U.el('div',{},...U.heading('Personnaliser vos étiquettes','Écritures, photos et couleurs : une base commune, puis les détails de chaque groupe ou élève.'),U.el('div',{class:'grid'},left,right));
    app.afterRender(()=>app.drawLabel(student));return result;
  }
  function cropFields(crop,set) {return [U.field('Zoom',crop.zoom,v=>set('zoom',v),{type:'range',min:1,max:5,step:.1}),U.field('Déplacement horizontal',crop.x,v=>set('x',v),{type:'range',min:-1,max:1,step:.05}),U.field('Déplacement vertical',crop.y,v=>set('y',v),{type:'range',min:-1,max:1,step:.05})];}
  globalThis.LabelPersonalize={personalize,icons};
})();
