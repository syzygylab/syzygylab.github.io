type Properties=Record<string,string|number|boolean|string[]>;
const allowed=new Set(['page','contact_method','subject','grade','availability','max_rate','tutor_id','tutor_name','subjects','grade_levels','session_format','selected_time','simulated','device_type']);
export const analyticsHost=process.env.NEXT_PUBLIC_POSTHOG_HOST||'https://us.i.posthog.com';
const key=process.env.NEXT_PUBLIC_POSTHOG_KEY;
let memoryId='';
function visitor(){try{let id=sessionStorage.getItem('abc-visitor');if(!id){id=crypto.randomUUID();sessionStorage.setItem('abc-visitor',id);}return id;}catch{memoryId ||= crypto.randomUUID();return memoryId;}}
export async function track(event:string,properties:Properties={},distinctId?:string){
 if(typeof window==='undefined'||!key)return false;
 const safe=Object.fromEntries(Object.entries(properties).filter(([k])=>allowed.has(k)));
 const payload={api_key:key,event,distinct_id:distinctId||visitor(),timestamp:new Date().toISOString(),properties:{$process_person_profile:false,$geoip_disable:true,device_type:window.matchMedia('(max-width: 767px)').matches?'Mobile':'Desktop',simulated:false,...safe}};
 try {const response=await fetch(`${analyticsHost}/i/v0/e/`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),keepalive:true});return response.ok;}catch{return false;}
}
