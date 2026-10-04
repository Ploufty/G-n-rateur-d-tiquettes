(() => {
  'use strict';
  const C=globalThis.LabelCore;
  function el(tag,attrs={},...children) {
    const node=document.createElement(tag);
    for(const [key,value]of Object.entries(attrs)){
      if(key.startsWith('on'))node.addEventListener(key.slice(2),value);
      else if(key==='class')node.className=value;
      else if(key==='checked'||key==='disabled'||key==='hidden')node[key]=value;
      else if(key==='value')node.value=value;
      else node.setAttribute(key,value);
    }
    for(const child of children.flat(Infinity))if(child!==null&&child!==undefined)node.append(child instanceof Node?child:document.createTextNode(String(child)));
    return node;
  }
  let uid=0;
  function field(label,value,onchange,options={}) {
    const ident=`field-${++uid}`;let input;
    if(options.choices)input=el('select',{id:ident,onchange:e=>onchange(e.target.value)},options.choices.map(item=>{const [v,name]=Array.isArray(item)?item:[item,item];return el('option',{value:v},name);}));
    else input=el('input',{id:ident,type:options.type||'text',...(options.min!==undefined?{min:options.min}:{}),...(options.max!==undefined?{max:options.max}:{}),...(options.step!==undefined?{step:options.step}:{}),onchange:e=>{
      if(!e.target.checkValidity()){e.target.reportValidity();e.target.value=value;return;}
      onchange(options.type==='number'||options.type==='range'?Number(e.target.value):e.target.value);
    }});
    input.value=value??'';
    return el('div',{class:'field'},el('label',{for:ident},label),input,options.hint?el('div',{class:'hint'},options.hint):null);
  }
  const check=(label,value,onchange)=>el('label',{class:'check'},el('input',{type:'checkbox',checked:value,onchange:e=>onchange(e.target.checked)}),label);
  const button=(text,fn,cls='ghost',disabled=false)=>el('button',{type:'button',class:`btn ${cls}`,onclick:fn,disabled},text);
  const card=(title,...children)=>el('div',{class:'card'},title?el('h3',{},title):null,...children);
  const heading=(title,description)=>[el('h2',{},title),el('p',{class:'lead'},description)];
  const notice=text=>el('div',{class:'notice'},text);
  function file(label,accept,fn,multiple=false) {
    return el('label',{class:'btn ghost file-button'},label,el('input',{type:'file',accept,...(multiple?{multiple:''}:{}),onchange:async e=>{try{await fn([...e.target.files]);}catch(err){globalThis.LabelApp?.notify(err.message,true);}finally{e.target.value='';}}}));
  }
  async function readImage(file) {
    if(file.size>10000000)throw Error('Une image doit faire moins de 10 Mo.');
    if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw Error('Utilisez une image JPG, PNG ou WebP.');
    const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('Lecture impossible.'));reader.readAsDataURL(file);});
    await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>img.width*img.height<=30000000?resolve():reject(Error('L’image dépasse 30 millions de pixels.'));img.onerror=()=>reject(Error('Image illisible.'));img.src=data;});
    return {id:C.id(),name:file.name,data};
  }
  function setPath(target,path,value) {const keys=path.split('.');let obj=target;for(const key of keys.slice(0,-1)){if(obj[key]===undefined)obj[key]=key==='lines'?[{},{},{}]:{};obj=obj[key];}obj[keys.at(-1)]=value;}
  globalThis.LabelUI={el,field,check,button,card,heading,notice,file,readImage,setPath};
})();
