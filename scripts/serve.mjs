import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf'};
http.createServer(async(req,res)=>{try{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)&&file!==root)throw Error();let stat=await fs.stat(file).catch(()=>null);if(stat?.isDirectory())file=path.join(file,'index.html');else if(!stat&&!path.extname(file))file+='.html';const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
