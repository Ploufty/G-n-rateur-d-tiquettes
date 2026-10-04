(() => {
  'use strict';
  const C=globalThis.LabelCore,U=globalThis.LabelUI;
  function groups(app) {
    const p=app.project;
    const groupCards=p.groups.map(g=>U.card(null,U.field('Nom du groupe',g.name,v=>app.change(()=>g.name=v.trim()||g.name)),U.el('div',{class:'fields'},U.field('Couleur',g.color,v=>app.change(()=>g.color=v),{type:'color'}),U.field('Icône',g.icon,v=>app.change(()=>g.icon=v),{choices:globalThis.LabelPersonalize.icons})),U.el('p',{class:'hint'},`${p.students.filter(s=>s.groupId===g.id).length} élève(s)`),U.el('div',{class:'btn-row'},U.button('Personnaliser les étiquettes',()=>{app.tab='labels';app.step=2;app.styleTarget='group:'+g.id;app.render(true);},'ghost small'),U.button('Supprimer le groupe',()=>app.change(()=>{p.students.filter(s=>s.groupId===g.id).forEach(s=>s.groupId=null);p.groups=p.groups.filter(x=>x.id!==g.id);}),'ghost danger small'))));
    const members=U.card('Affecter les élèves',p.students.length?p.students.map(s=>U.el('div',{class:'group-member'},U.el('span',{},s.name),U.field('Groupe de '+s.name,s.groupId||'',v=>app.change(()=>s.groupId=v||null),{choices:[['','Sans groupe'],...p.groups.map(g=>[g.id,g.name])]}))):U.el('p',{class:'hint'},'Ajoutez votre liste dans l’onglet Étiquettes.'));
    const balance=()=>{
      if(!p.groups.length){app.notify('Créez au moins un groupe.',true);return;}
      const preview=document.querySelector('#balance-preview');
      const assignments=p.students.map((s,i)=>({student:s,group:p.groups[i%p.groups.length]}));
      preview.replaceChildren(U.notice('Proposition de répartition : vérifiez avant de remplacer les affectations.'),...p.groups.map(g=>U.el('p',{},g.name+' : '+assignments.filter(a=>a.group.id===g.id).map(a=>a.student.name).join(', '))),U.button('Appliquer cette répartition',()=>app.change(()=>assignments.forEach(a=>a.student.groupId=a.group.id)),''),U.button('Annuler la proposition',()=>preview.replaceChildren()));
    };
    return U.el('div',{},...U.heading('Les groupes de la classe','La même liste, un groupe par élève. Les couleurs et les icônes vous suivent sur les étiquettes.'),U.el('div',{class:'btn-row'},U.button('Ajouter un groupe',()=>{if(p.groups.length>=30){app.notify('Maximum 30 groupes.',true);return;}app.change(()=>p.groups.push({id:C.id(),name:'Nouveau groupe',color:'#000091',icon:'',style:{}}));}),U.button('Proposer une répartition équilibrée',balance),U.button('Exporter la liste en PDF',()=>app.busy(()=>globalThis.LabelExports.groupsPDF(p)),'')),U.el('div',{id:'balance-preview'}),U.el('div',{class:'grid'},U.el('div',{class:'group-list'},groupCards),members));
  }
  globalThis.LabelGroups={groups};
})();
