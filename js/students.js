(() => {
  'use strict';
  const C=globalThis.LabelCore,U=globalThis.LabelUI;
  function students(app) {
    const p=app.project,area=U.el('textarea',{id:'names',placeholder:'Léna\nMalo\nInès',maxlength:30300});area.value=p.students.map(s=>s.name).join('\n');
    const apply=()=>{const names=area.value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);app.change(()=>p.students=C.reconcileNames(p.students,names));};
    const listCard=U.card('La liste de votre classe',U.el('label',{for:'names'},'Un prénom par ligne'),area,U.el('p',{class:'hint'},'Les accents et les homonymes sont conservés. Pour renommer un élève sans perdre sa photo, utilisez sa fiche ci-dessous.'),U.el('div',{class:'btn-row'},U.button('Appliquer la liste',apply,''),U.file('Importer CSV / TXT','.csv,.txt,text/csv,text/plain',async files=>{
      const file=files[0];if(!file)return;if(file.size>1000000)throw Error('Le fichier de liste doit faire moins de 1 Mo.');const text=await file.text();
      if(file.name.toLowerCase().endsWith('.txt')){app.change(()=>p.students=C.reconcileNames(p.students,text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean)));return;}
      const rows=C.parseCSV(text);app.change(()=>{p.students=C.reconcileNames(p.students,rows.map(r=>r.name));rows.forEach((r,i)=>{p.students[i].copies=r.copies;if(r.group){let group=p.groups.find(g=>C.normal(g.name)===C.normal(r.group));if(!group){if(p.groups.length>=30)throw Error('Maximum 30 groupes.');group={id:C.id(),name:r.group,color:'#000091',icon:'',style:{}};p.groups.push(group);}p.students[i].groupId=group.id;}});});
    })),U.notice('CSV provisoire : Prénom;Groupe;Exemplaires. Le groupe et la quantité sont facultatifs. Le format sera adapté à votre fichier de référence.'),U.button('Télécharger un exemple CSV',()=>globalThis.LabelExports.download(new Blob(['\uFEFFPrénom;Groupe;Exemplaires\nLéna;Rouge;2\nMalo;Bleu;1\nInès;;\n'],{type:'text/csv;charset=utf-8'}),'exemple-classe.csv'),'ghost small'));
    const options=U.card('Ordre et exemplaires',U.field('Exemplaires par élève',p.copies,v=>app.change(()=>p.copies=v),{type:'number',min:1,max:50}),U.field('Ordre des étiquettes',p.order,v=>app.change(()=>p.order=v),{choices:[['list','Ordre de la liste / manuel'],['alpha','Ordre alphabétique'],['group','Par groupe']]}),U.notice('Les quantités individuelles ci-dessous remplacent le nombre commun.'));
    const left=U.el('div',{},listCard),right=U.el('div',{},options,U.card('Les photos de la classe',U.file('Importer plusieurs photos','image/png,image/jpeg,image/webp',files=>batchPhotos(app,files),true),U.el('p',{class:'hint'},'Nommez vos images avec les prénoms. Vérifiez chaque association avant de l’appliquer.'),U.el('div',{id:'photo-review',class:'photo-review'})));
    const roster=U.card('Fiches élèves',p.students.length?U.el('div',{class:'student-list'},p.students.map((s,i)=>{
      const name=U.el('input',{type:'text',value:s.name,maxlength:100,'aria-label':'Prénom de '+s.name,onchange:e=>{if(e.target.value.trim())app.change(()=>s.name=e.target.value.trim());else e.target.value=s.name;}});
      const copies=U.el('input',{type:'number',min:1,max:50,value:s.copies??'',placeholder:String(p.copies),'aria-label':'Exemplaires pour '+s.name,onchange:e=>{if(e.target.value===''||e.target.checkValidity())app.change(()=>s.copies=e.target.value===''?null:Number(e.target.value));else{e.target.reportValidity();e.target.value=s.copies??'';}}});
      const move=delta=>app.change(()=>{p.order='list';const other=i+delta;[p.students[i],p.students[other]]=[p.students[other],p.students[i]];});
      return U.el('div',{class:'student-row'},name,copies,U.el('div',{class:'btn-row'},U.el('button',{class:'btn ghost small','aria-label':'Monter '+s.name,disabled:i===0,onclick:()=>move(-1)},'↑'),U.el('button',{class:'btn ghost small','aria-label':'Descendre '+s.name,disabled:i===p.students.length-1,onclick:()=>move(1)},'↓'),U.button(s.photoId?'Photo ✓':'Photo',()=>{app.selectedStudent=s.id;app.styleTarget='student:'+s.id;app.step=2;app.render(true);},'ghost small'),U.el('button',{class:'btn ghost danger small','aria-label':'Supprimer '+s.name,onclick:()=>app.change(()=>p.students.splice(i,1))},'×')));
    })):U.el('div',{class:'empty'},'Ajoutez les prénoms de la classe pour commencer.'));
    return U.el('div',{},...U.heading('Préparer la classe','Une seule liste pour toutes vos étiquettes et tous vos groupes.'),U.el('div',{class:'grid'},left,right),roster);
  }
  async function batchPhotos(app,files) {
    if(files.length>300)throw Error('Importez au maximum 300 photos.');
    const p=app.project,review=document.querySelector('#photo-review');if(!p.students.length)throw Error('Ajoutez d’abord la liste des élèves.');
    review.replaceChildren(U.el('p',{},'Lecture des photos…'));
    const entries=[];
    for(const file of files){const resource=await U.readImage(file),name=C.normal(file.name.replace(/\.[^.]+$/,'')),matches=p.students.filter(s=>C.normal(s.name)===name);entries.push({resource,studentId:matches.length===1?matches[0].id:''});}
    review.replaceChildren(U.el('p',{class:'hint'},'Une case vide signifie aucune association. Les homonymes demandent un choix manuel.'),...entries.map(entry=>U.el('div',{},U.el('img',{src:entry.resource.data,alt:entry.resource.name}),U.field(entry.resource.name,entry.studentId,v=>entry.studentId=v,{choices:[['','Ne pas associer'],...p.students.map((s,i)=>[s.id,`${i+1}. ${s.name}`])]}))),U.button('Valider les associations',()=>{
      const assigned=entries.filter(e=>e.studentId).map(e=>e.studentId);if(new Set(assigned).size!==assigned.length){app.notify('Plusieurs photos sont associées au même élève.',true);return;}
      app.change(()=>entries.forEach(e=>{const s=p.students.find(s=>s.id===e.studentId);if(s){p.resources.push(e.resource);s.photoId=e.resource.id;s.crop={zoom:1,x:0,y:0};}}));app.notify('Photos associées à la classe.');
    },''));
  }
  globalThis.LabelStudents={students};
})();
