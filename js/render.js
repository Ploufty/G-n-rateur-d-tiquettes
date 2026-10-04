(() => {
  'use strict';
  const C=globalThis.LabelCore, cache=new Map();
  const MM=96/25.4, PT=96/72;
  function image(data) {
    if(!cache.has(data)) cache.set(data,new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>{cache.delete(data);reject(Error('Une image du projet ne peut pas être lue.'));};img.src=data;}));
    return cache.get(data);
  }
  async function ready(project) {
    const active=new Set(project.resources.map(r=>r.data));for(const data of cache.keys())if(!active.has(data))cache.delete(data);
    await Promise.all(C.FONTS.map(font=>document.fonts.load(`28px "${font}"`)));
    await document.fonts.ready;
    return new Map(await Promise.all(project.resources.map(async r=>[r.id,await image(r.data)])));
  }
  function rounded(ctx,x,y,w,h,r) {ctx.beginPath();ctx.roundRect(x,y,w,h,Math.min(r,w/2,h/2));}
  function cover(ctx,img,x,y,w,h,crop) {
    const ratio=Math.max(w/img.width,h/img.height)*crop.zoom;
    const iw=img.width*ratio,ih=img.height*ratio;
    ctx.drawImage(img,x+(w-iw)/2-crop.x*(iw-w)/2,y+(h-ih)/2-crop.y*(ih-h)/2,iw,ih);
  }
  function icon(ctx,kind,x,y,size,color) {
    if(!kind)return; ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.beginPath();
    if(kind==='circle')ctx.arc(0,0,size/2,0,Math.PI*2);
    if(kind==='triangle'){ctx.moveTo(0,-size/2);ctx.lineTo(size/2,size/2);ctx.lineTo(-size/2,size/2);}
    if(kind==='star'||kind==='sun'){const n=kind==='star'?5:12;for(let i=0;i<n*2;i++){const a=i*Math.PI/n-Math.PI/2,r=i%2?size*.23:size*.5;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}}
    if(kind==='heart'){ctx.moveTo(0,size*.4);ctx.bezierCurveTo(-size,-size*.2,-size*.35,-size*.8,0,-size*.2);ctx.bezierCurveTo(size*.35,-size*.8,size,-size*.2,0,size*.4);}
    if(kind==='flower'){for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.moveTo(Math.cos(a)*size*.23+size*.19,Math.sin(a)*size*.23);ctx.arc(Math.cos(a)*size*.23,Math.sin(a)*size*.23,size*.19,0,Math.PI*2);}}
    ctx.closePath();ctx.fill();ctx.restore();
  }
  function transformed(name,casing) {
    if(casing==='upper')return name.toLocaleUpperCase('fr');
    if(casing==='lower')return name.toLocaleLowerCase('fr');
    if(casing==='title')return name.slice(0,1).toLocaleUpperCase('fr')+name.slice(1).toLocaleLowerCase('fr');
    return name;
  }
  function drawLine(ctx,name,line,x,y,w,maxHeight) {
    const text=transformed(name,line.casing),first=Array.from(text)[0]||'',rest=text.slice(first.length);
    let size=line.size*PT;
    const highlighted=line.initialSize!==1||line.initialBold||line.initialColor!==line.color;
    const font=(px,bold)=>`${bold?'700':'400'} ${px}px "${line.font}"`;
    const measure=()=>{
      if(!highlighted){ctx.font=font(size,line.bold);return ctx.measureText(text).width;}
      ctx.font=font(size*line.initialSize,line.bold||line.initialBold);const a=ctx.measureText(first).width;
      ctx.font=font(size,line.bold);return a+ctx.measureText(rest).width;
    };
    const width=measure();size*=Math.min(1,w/Math.max(width,1),maxHeight/(size*line.initialSize*1.65));
    ctx.textBaseline='middle';
    if(!highlighted){ctx.font=font(size,line.bold);ctx.fillStyle=line.color;ctx.textAlign='center';ctx.fillText(text,x+w/2,y);}
    else {
      const fitted=measure(),start=x+(w-fitted)/2;ctx.textAlign='left';ctx.font=font(size*line.initialSize,line.bold||line.initialBold);ctx.fillStyle=line.initialColor;ctx.fillText(first,start,y);
      const offset=ctx.measureText(first).width;ctx.font=font(size,line.bold);ctx.fillStyle=line.color;ctx.fillText(rest,start+offset,y);
    }
  }
  function drawLabel(ctx,project,student,x,y,w,h,images) {
    const style=C.resolveStyle(project,student),pad=Math.min(3*MM,w*.05,h*.09);
    ctx.save();rounded(ctx,x,y,w,h,style.border.radius*MM);ctx.clip();ctx.fillStyle=style.background.color;ctx.fillRect(x,y,w,h);
    const bg=images.get(style.background.assetId);
    if(bg){ctx.save();ctx.globalAlpha=style.background.opacity;cover(ctx,bg,x,y,w,h,style.background);ctx.restore();}
    let tx=x+pad,ty=y+pad,tw=w-2*pad,th=h-2*pad;
    const photo=images.get(student.photoId);
    if(photo){
      const top=style.photo.position==='top',aspect=style.photo.shape==='rectangle'?1.3:1;const pw=Math.min(style.photo.size*MM,top?tw*.65:tw*.4,(top?th*.45:th)/aspect),ph=pw*aspect;
      const px=top?x+(w-pw)/2:style.photo.position==='right'?x+w-pad-pw:x+pad;
      const py=top?ty:y+(h-ph)/2;
      ctx.save();if(style.photo.shape==='circle'){ctx.beginPath();ctx.ellipse(px+pw/2,py+ph/2,pw/2,ph/2,0,0,Math.PI*2);}else rounded(ctx,px,py,pw,ph,style.photo.shape==='rounded'?2*MM:0);
      ctx.clip();cover(ctx,photo,px,py,pw,ph,student.crop);ctx.restore();
      if(top){ty+=ph+pad;th-=ph+pad;}else{tw-=pw+pad;if(style.photo.position==='left')tx+=pw+pad;}
    }
    const lines=style.lines.filter(line=>line.enabled),extras=(style.initial.enabled?1:0)+(style.icon?1:0),slots=lines.length+extras;
    const sh=th/Math.max(slots,1);let cy=ty+sh/2;
    if(style.icon){icon(ctx,style.icon,tx+tw/2,cy,Math.min(sh*.65,8*MM),style.iconColor);cy+=sh;}
    if(style.initial.enabled){drawLine(ctx,Array.from(student.name)[0]||'',{...style.lines[0],font:'Nunito Sans',size:style.initial.size,casing:'upper',color:style.initial.color,initialColor:style.initial.color,initialSize:1,initialBold:false,bold:true},tx,cy,tw,sh);cy+=sh;}
    lines.forEach(line=>{drawLine(ctx,student.name,line,tx,cy,tw,sh);cy+=sh;});
    ctx.restore();
    if(style.border.enabled){ctx.save();ctx.strokeStyle=style.border.color;ctx.lineWidth=style.border.width*MM;ctx.setLineDash(style.border.dashed?[2*MM,MM]:[]);const inset=ctx.lineWidth/2;rounded(ctx,x+inset,y+inset,w-2*inset,h-2*inset,Math.max(0,style.border.radius*MM-inset));ctx.stroke();ctx.restore();}
  }
  function canvas(w,h,dpi) {const c=document.createElement('canvas');c.width=Math.round(w*dpi/25.4);c.height=Math.round(h*dpi/25.4);return c;}
  function labelCanvas(project,student,images,dpi=150) {
    const l=C.computeLayout(project.layout),c=canvas(l.width,l.height,dpi),ctx=c.getContext('2d');ctx.scale(dpi/96,dpi/96);drawLabel(ctx,project,student,0,0,l.width*MM,l.height*MM,images);return c;
  }
  function pageCanvas(project,page,images,dpi=100) {
    const l=C.computeLayout(project.layout),c=canvas(l.w,l.h,dpi),ctx=c.getContext('2d');ctx.scale(dpi/96,dpi/96);ctx.fillStyle='#fff';ctx.fillRect(0,0,l.w*MM,l.h*MM);
    page.forEach(item=>drawLabel(ctx,project,item.student,item.x*MM,item.y*MM,l.width*MM,l.height*MM,images));
    if(project.layout.cutMarks){ctx.strokeStyle='#777';ctx.lineWidth=.12*MM;page.forEach(item=>{const x=item.x*MM,y=item.y*MM,w=l.width*MM,h=l.height*MM;for(const [cx,cy] of [[x,y],[x+w,y],[x,y+h],[x+w,y+h]]){ctx.beginPath();ctx.moveTo(cx-MM,cy);ctx.lineTo(cx+MM,cy);ctx.moveTo(cx,cy-MM);ctx.lineTo(cx,cy+MM);ctx.stroke();}});}
    return c;
  }
  globalThis.LabelRender={ready,labelCanvas,pageCanvas,drawLabel,icon};
})();
