(() => {
  'use strict';
  const C=globalThis.LabelCore,U=globalThis.LabelUI;
  function layout(app) {
    const p=app.project,l=p.layout,set=(k,v)=>app.change(()=>{l[k]=v;if(['mode','width','height','columns','rows','orientation','gapX','gapY','marginTop','marginBottom','marginLeft','marginRight'].includes(k))l.excluded=[];});
    const field=(label,key,min,max,step=1)=>U.field(label,l[key],v=>set(key,v),{type:'number',min,max,step});
    let computed,error;try{computed=C.computeLayout(l);}catch(e){error=e.message;}
    const settings=U.card('La feuille A4',U.el('div',{class:'fields'},U.field('Orientation',l.orientation,v=>set('orientation',v),{choices:[['portrait','Portrait · 210 × 297 mm'],['landscape','Paysage · 297 × 210 mm']]}),U.field('Mode de calcul',l.mode,v=>set('mode',v),{choices:[['dimensions','Dimensions des étiquettes'],['grid','Nombre de lignes et colonnes']]})),U.el('div',{class:'fields'},...(l.mode==='dimensions'?[field('L · Largeur (mm)','width',5,297,.5),field('H · Hauteur (mm)','height',5,297,.5)]:[field('Colonnes','columns',1,30),field('Lignes','rows',1,30)])),computed?U.notice(`${computed.columns} colonnes × ${computed.rows} lignes · ${computed.width.toFixed(1)} × ${computed.height.toFixed(1)} mm · ${computed.capacity} cases par feuille`):U.notice(error));
    const margins=U.card('Marges et espacements',U.el('div',{class:'fields'},field('Marge gauche (mm)','marginLeft',0,100,.5),field('Marge droite (mm)','marginRight',0,100,.5),field('Marge haute (mm)','marginTop',0,100,.5),field('Marge basse (mm)','marginBottom',0,100,.5),field('l · Espace horizontal (mm)','gapX',0,100,.5),field('h · Espace vertical (mm)','gapY',0,100,.5)));
    const diagram=document.createElementNS('http://www.w3.org/2000/svg','svg');diagram.setAttribute('viewBox','0 0 340 190');diagram.setAttribute('class','dimension-diagram');diagram.setAttribute('role','img');diagram.setAttribute('aria-label','Schéma : largeur L, hauteur H et espaces horizontal l et vertical h.');
    // Contenu statique de confiance ; aucune donnée du projet dans ce SVG.
    diagram.innerHTML='<rect x="30" y="35" width="125" height="60" rx="5"/><rect x="180" y="35" width="125" height="60" rx="5"/><rect x="30" y="120" width="125" height="55" rx="5"/><rect x="180" y="120" width="125" height="55" rx="5"/><path d="M30 20h125M20 35v60M155 65h25M90 95v25"/><text x="65" y="14">L · largeur</text><text x="2" y="70">H</text><text x="164" y="59">l</text><text x="98" y="111">h</text><text x="46" y="73">ÉTIQUETTE</text>';
    const right=U.el('div',{},U.card('Comprendre les mesures',diagram,U.el('p',{class:'hint'},'L et H : taille de l’étiquette. l et h : espaces entre les étiquettes. Les marges entourent la grille.'),U.el('p',{class:'hint'},'Un seul mode pilote le calcul. Les autres dimensions sont calculées automatiquement.')));
    if(app.advanced){
      const calibration=U.card('Calibration et découpe',U.el('div',{class:'fields'},field('Décalage horizontal (mm)','offsetX',-20,20,.1),field('Décalage vertical (mm)','offsetY',-20,20,.1)),U.check('Afficher les repères de découpe',l.cutMarks,v=>set('cutMarks',v)),U.button('Télécharger la page de calibration',()=>app.busy(()=>globalThis.LabelExports.calibration(p))),U.el('p',{class:'hint'},'Imprimez à 100 % / taille réelle. Mesurez le carré de 100 mm avant de régler un décalage.'));
      right.append(calibration);
      if(computed){
        const excluded=U.card('Planche autocollante déjà utilisée',U.el('p',{class:'hint'},'Cliquez sur les cases à exclure sur la première feuille uniquement. Les pages suivantes utilisent toutes les cases.'),U.el('div',{class:'slot-grid',id:'slot-grid'},Array.from({length:computed.capacity},(_,i)=>U.el('button',{type:'button',class:l.excluded.includes(i)?'excluded':'','aria-pressed':l.excluded.includes(i),'aria-label':`Case ${i+1} ${l.excluded.includes(i)?'utilisée':'disponible'}`,onclick:()=>app.change(()=>{l.excluded=l.excluded.includes(i)?l.excluded.filter(s=>s!==i):[...l.excluded,i];})},`${i+1}${l.excluded.includes(i)?' ×':''}`))),U.button('Rendre toutes les cases disponibles',()=>set('excluded',[]),'ghost small'));
        app.afterRender(()=>document.querySelector('#slot-grid')?.style.setProperty('grid-template-columns',`repeat(${computed.columns},minmax(0,1fr))`));right.append(excluded);
      }
    }
    return U.el('div',{},...U.heading('Régler la mise en page','Des dimensions en millimètres, une grille calculée et des fichiers prêts pour une impression à taille réelle.'),U.el('div',{class:'grid'},U.el('div',{},settings,margins),right));
  }
  globalThis.LabelLayout={layout};
})();
