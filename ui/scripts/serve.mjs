import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 5173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.mp4':'video/mp4'};
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end('Bad request'); }
  let file = path.resolve(root, '.'+pathname);
  if (!file.startsWith(root+path.sep) && file !== root) {res.writeHead(403);return res.end('Forbidden');}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) {res.writeHead(301,{Location:pathname+'/'});return res.end();}
    file = path.join(file,'index.html');
  }
  let status = 200;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {file=path.join(root,'404/index.html');status=404;}
  const stat = fs.statSync(file);
  const headers = {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
  const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if (range) {
    const start=Number(range[1]),end=Math.min(range[2]?Number(range[2]):stat.size-1,stat.size-1);
    if (start > end || start >= stat.size) {res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
    res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file,{start,end}).pipe(res);
  } else {
    res.writeHead(status,{...headers,'Content-Length':stat.size});
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  }
}).listen(port,'0.0.0.0',()=>console.log(`GreenVolt is available at http://localhost:${port}`));
