import {execFileSync} from 'node:child_process';
const credential=execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',env:{...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'}});
const token=credential.split('\n').find(line=>line.startsWith('password='))?.slice(9).trim();
if(!token)throw new Error('No saved GitHub credentials available.');
const root='https://api.github.com';const repo='/repos/syzygylab/syzygylab.github.io';
async function api(path,method='GET',body){const response=await fetch(root+path,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});const data=response.status===204?{}:await response.json();if(!response.ok)throw new Error(`${method} ${path}: ${response.status} ${data.message}`);return data;}
const mode=process.argv[2]||'inspect';
if(mode==='inspect'){const user=await api('/user');const project=await api(repo);console.log(JSON.stringify({login:user.login,id:user.id,defaultBranch:project.default_branch,permissions:project.permissions}));}
if(mode==='configure'){
 const key=process.env.NEXT_PUBLIC_POSTHOG_KEY;if(!key)throw new Error('PostHog build key missing.');
 for(const [name,value] of Object.entries({NEXT_PUBLIC_POSTHOG_KEY:key,NEXT_PUBLIC_POSTHOG_HOST:process.env.NEXT_PUBLIC_POSTHOG_HOST||'https://us.i.posthog.com'})){
  try{await api(`${repo}/actions/variables/${name}`,'PATCH',{name,value});}catch(err){if(!String(err).includes('404'))throw err;await api(`${repo}/actions/variables`,'POST',{name,value});}
 }
 try{await api(`${repo}/pages`);await api(`${repo}/pages`,'PUT',{build_type:'workflow'});}catch(err){if(!String(err).includes('404'))throw err;await api(`${repo}/pages`,'POST',{build_type:'workflow'});}
 console.log('GitHub Pages configured for Actions; public PostHog build variables configured.');
}
if(mode==='status'){const runs=await api(`${repo}/actions/runs?per_page=3`);console.log(JSON.stringify(runs.workflow_runs.map(r=>({id:r.id,status:r.status,conclusion:r.conclusion,url:r.html_url,sha:r.head_sha}))));}
