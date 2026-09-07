import fs from 'node:fs/promises';
import path from 'node:path';
import { Liquid } from 'liquidjs';
import YAML from 'yaml';
const root=process.cwd();
const engine=new Liquid({root:path.join(root,'_includes'),jekyllInclude:true,strictFilters:true});
const config=YAML.parse(await fs.readFile('_config.yml','utf8'));
if(process.env.SITE_BASEURL !== undefined) config.baseurl=process.env.SITE_BASEURL.replace(/\/$/,'');
if(process.env.SITE_URL) config.url=process.env.SITE_URL;
engine.registerFilter('relative_url',v=>/^(?:https?:)?\/\//.test(String(v||'')) ? v : config.baseurl+'/'+String(v||'').replace(/^\//,''));
engine.registerFilter('jsonify',v=>JSON.stringify(v,(_key,value)=>typeof value==='string' && value.startsWith('/assets/') ? config.baseurl+value : value).replace(/</g,'\\u003c'));
engine.registerFilter('encode_email',v=>v);
engine.registerFilter('group_by_exp',function(items,variable,expression){const groups=new Map();for(const item of items){const year=String(item.date).slice(0,4);if(!groups.has(year))groups.set(year,[]);groups.get(year).push(item);}return [...groups].map(([name,items])=>({name,items}));});
function front(text){const match=text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);return match?{meta:YAML.parse(match[1]),body:text.slice(match[0].length)}:{meta:{},body:text};}
const data={};for(const file of await fs.readdir('_data')){if(file.endsWith('.yml'))data[file.slice(0,-4)]=YAML.parse(await fs.readFile('_data/'+file,'utf8'));}
const publications=[];
async function walk(dir){for(const d of await fs.readdir(dir,{withFileTypes:true})){let f=path.join(dir,d.name);if(d.isDirectory())await walk(f);else if(f.endsWith('.md'))publications.push({...front(await fs.readFile(f,'utf8')).meta,id:f});}}
await walk('_publications');
const site={...config,data,publications,time:new Date().toISOString()};
await fs.rm('dist',{recursive:true,force:true});await fs.mkdir('dist');await fs.cp('assets','dist/assets',{recursive:true});
for(const name of ['index','publications','showcase','404']){
 const {meta:page,body}=front(await fs.readFile(name+'.html','utf8'));
 const content=await engine.parseAndRender(body,{site,page});
 const layout=await fs.readFile('_layouts/'+page.layout+'.html','utf8');
 const rendered=await engine.parseAndRender(layout,{site,page,content});
 await fs.writeFile('dist/'+name+'.html',rendered);
 if(!['index','404'].includes(name)){await fs.mkdir('dist/'+name);await fs.writeFile('dist/'+name+'/index.html',rendered);}
}
console.log(`Built Home, Publications (${publications.length} papers), Showcase and 404 from the original Jekyll templates.`);
