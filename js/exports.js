(() => {
  'use strict';
  const C=globalThis.LabelCore,R=globalThis.LabelRender;
  function download(blob,name) {const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
  const safeName=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-|-$/g,'').slice(0,60)||'etiquette';
  const png=c=>new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(Error('Impossible de créer le PNG.')),'image/png'));
  function pdfDocument(l) {return new globalThis.jspdf.jsPDF({orientation:l.w>l.h?'landscape':'portrait',unit:'mm',format:[l.w,l.h],compress:true});}
  async function pdf(project,progress) {
    const pages=C.paginate(project);if(!pages.length)throw Error('Ajoutez au moins un élève.');
    const images=await R.ready(project),l=C.computeLayout(project.layout),doc=pdfDocument(l),rendered=new Map();
    for(let i=0;i<pages.length;i++){
      if(i)doc.addPage([l.w,l.h],l.w>l.h?'landscape':'portrait');
      for(const item of pages[i]){
        if(!rendered.has(item.student.id))rendered.set(item.student.id,R.labelCanvas(project,item.student,images,300).toDataURL('image/png'));
        doc.addImage(rendered.get(item.student.id),'PNG',item.x,item.y,l.width,l.height,item.student.id,'FAST');
        if(project.layout.cutMarks){doc.setDrawColor(110);doc.setLineWidth(.12);for(const [x,y]of [[item.x,item.y],[item.x+l.width,item.y],[item.x,item.y+l.height],[item.x+l.width,item.y+l.height]]){doc.line(x-1,y,x+1,y);doc.line(x,y-1,x,y+1);}}
      }
      progress?.(`PDF : page ${i+1} sur ${pages.length}`);await new Promise(r=>setTimeout(r,0));
    }
    download(doc.output('blob'),`${safeName(project.name)}.pdf`);
  }
  async function exportPNG(project,type,studentId,pageIndex,dpi,progress) {
    const images=await R.ready(project),l=C.computeLayout(project.layout);
    if(l.w*l.h*(dpi/25.4)**2>20000000 && type==='page')throw Error('Choisissez une résolution de page de 300 ppp au maximum.');
    if(type==='label'){const s=project.students.find(s=>s.id===studentId);if(!s)throw Error('Choisissez un élève.');download(await png(R.labelCanvas(project,s,images,dpi)),`${safeName(s.name)}.png`);}
    if(type==='page'){const pages=C.paginate(project);if(!pages.length)throw Error('Ajoutez un élève.');download(await png(R.pageCanvas(project,pages[pageIndex]||pages[0],images,dpi)),`${safeName(project.name)}-page-${pageIndex+1}.png`);}
    if(type==='zip'){
      const zip=new JSZip(),items=C.labelItems(project);if(!items.length)throw Error('Ajoutez un élève.');
      const rendered=new Map();
      for(let i=0;i<items.length;i++){const {student,copy}=items[i];if(!rendered.has(student.id))rendered.set(student.id,await png(R.labelCanvas(project,student,images,dpi)));zip.file(`${String(i+1).padStart(4,'0')}-${safeName(student.name)}-${copy+1}.png`,rendered.get(student.id));progress?.(`Images : ${i+1} sur ${items.length}`);await new Promise(r=>setTimeout(r,0));}
      download(await zip.generateAsync({type:'blob',compression:'STORE'}),`${safeName(project.name)}-etiquettes.zip`);
    }
  }
  function calibration(project) {
    const l=C.computeLayout(project.layout),doc=pdfDocument(l);doc.setFontSize(16);doc.text('Calibration A4 - impression a 100 %',15,18);doc.setFontSize(10);doc.text('Le carre doit mesurer 100 x 100 mm. Ne pas ajuster a la page.',15,28);doc.setLineWidth(.2);doc.rect(15,40,100,100);doc.text('100 mm',55,150);doc.line(15,160,115,160);for(let x=15;x<=115;x+=10)doc.line(x,157,x,163);download(doc.output('blob'),'calibration-a4.pdf');
  }
  async function groupsPDF(project) {
    const doc=pdfDocument({w:210,h:297});const canvas=document.createElement('canvas');canvas.width=1240;canvas.height=1754;const ctx=canvas.getContext('2d');await R.ready(project);
    const sections=[...project.groups,{id:null,name:'Sans groupe',color:'#555566'}];let y=70,page=0;
    const flush=()=>{if(page++)doc.addPage();doc.addImage(canvas.toDataURL('image/png'),'PNG',0,0,210,297);ctx.fillStyle='#fff';ctx.fillRect(0,0,1240,1754);y=70;};
    ctx.fillStyle='#fff';ctx.fillRect(0,0,1240,1754);ctx.fillStyle='#000091';ctx.font='700 32px Arial';ctx.fillText(project.name+' · Groupes',70,y);y+=65;
    for(const g of sections){const students=project.students.filter(s=>s.groupId===g.id);if(!students.length)continue;if(y>1550)flush();ctx.fillStyle=g.color;ctx.font='700 27px Arial';ctx.fillText(`${g.name} (${students.length})`,70,y);y+=45;ctx.font='24px Arial';ctx.fillStyle='#202936';for(const s of students){if(y>1640)flush();ctx.fillText(s.name,90,y);y+=38;}y+=28;}
    flush();download(doc.output('blob'),`${safeName(project.name)}-groupes.pdf`);
  }
  globalThis.LabelExports={download,pdf,exportPNG,calibration,groupsPDF,safeName};
})();
