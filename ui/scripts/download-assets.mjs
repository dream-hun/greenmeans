import fs from 'node:fs';
const manifest = JSON.parse(fs.readFileSync('src/assets.json','utf8'));
const entries = Object.entries(manifest);
let downloaded=0;
const failures=[];
async function worker() {
  while(entries.length) {
    const [file,url]=entries.shift();
    if(fs.existsSync(file) && fs.statSync(file).size>0) continue;
    try {
      const response=await fetch(url,{signal:AbortSignal.timeout(120000)});
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      fs.writeFileSync(file,Buffer.from(await response.arrayBuffer()));
      downloaded++;
    } catch(error) {failures.push({file,url,error:error.message});}
  }
}
await Promise.all(Array.from({length:6},worker));
console.log({downloaded,failures});
if(failures.length) process.exitCode=1;
