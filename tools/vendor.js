import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
await mkdir('vendor', {recursive:true}); await mkdir('assets/fonts',{recursive:true});
for (const [from,to] of [['jspdf/dist/jspdf.umd.min.js','jspdf.js'],['jszip/dist/jszip.min.js','jszip.js']]) {
  await copyFile(path.join('node_modules',from),path.join('vendor',to));
}
// Marelle et Marelle Bâton proviennent de la Forge éducative. Leurs fichiers
// et leur licence sont conservés directement dans assets/fonts.
for (const [pkg,name,weights] of [['nunito-sans','NunitoSans',[400,700]],['playwrite-fr-trad','PlaywriteFRTrad',[400]],['fredoka','Fredoka',[400,700]],['opendyslexic','OpenDyslexic',[400,700]]]) {
  for (const weight of weights) await copyFile(`node_modules/@fontsource/${pkg}/files/${pkg}-latin-${weight}-normal.woff2`,`assets/fonts/${name}-${weight}.woff2`);
  await copyFile(`node_modules/@fontsource/${pkg}/LICENSE`,`assets/fonts/${name}-LICENSE.txt`);
}
const licenses=[];
for(const pkg of ['jspdf','jszip']) {
  const filename=pkg==='jszip'?'LICENSE.markdown':'LICENSE';
  licenses.push(`## ${pkg}\n\n${await readFile(`node_modules/${pkg}/${filename}`,'utf8')}`);
}
await writeFile('vendor/LICENSES.md',licenses.join('\n\n'));
console.log('Bibliothèques et polices copiées avec leurs licences.');
