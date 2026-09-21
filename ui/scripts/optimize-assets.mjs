import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
fs.mkdirSync('assets/optimized',{recursive:true});
let originalBytes=0,optimizedBytes=0;
for(const filename of fs.readdirSync('assets/images').filter(f=>/\.(png|jpe?g)$/i.test(f))) {
  const input=path.join('assets/images',filename);
  const output=path.join('assets/optimized',filename.replace(/\.[^.]+$/,'.webp'));
  if(!fs.existsSync(output) || fs.statSync(input).mtimeMs>fs.statSync(output).mtimeMs) {
    await sharp(input).resize({width:1920,height:1920,fit:'inside',withoutEnlargement:true}).webp({quality:88,effort:5}).toFile(output);
  }
  originalBytes+=fs.statSync(input).size;
  optimizedBytes+=fs.statSync(output).size;
}
console.log(`Image transfer size: ${(originalBytes/1048576).toFixed(1)} MB → ${(optimizedBytes/1048576).toFixed(1)} MB.`);
