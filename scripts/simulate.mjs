// Ingestion-only demonstration. Does not create local booking requests.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
if (!key) throw new Error('Set NEXT_PUBLIC_POSTHOG_KEY before simulating.');
const subjects = ['Math', 'Math', 'Reading', 'Science', 'Science', 'Reading'];
const names = ['Maya Chen', 'James Wilson', 'Sofia Rivera', 'Daniel Brooks', 'Aisha Patel', 'Emma Thompson'];
const ids = ['maya', 'james', 'sofia', 'daniel', 'aisha', 'emma'];
const batch = [];
for (let i = 0; i < 6; i++) {
 const distinct_id = `abc-simulation-${crypto.randomUUID()}`;
 const events = ['$pageview', 'tutor_browse', 'tutor_filter', 'tutor_profile_view', 'booking_started', 'time_slot_selected', 'session_format_selected', ...(i === 1 ? [] : ['booking_request_completed'])];
 for (let j = 0; j < events.length; j++) batch.push({event:events[j],timestamp:new Date(Date.now()-60000+j*1000).toISOString(),properties:{distinct_id,$process_person_profile:false,$geoip_disable:true,simulated:true,page:j===0?'/':'/tutors',tutor_id:ids[i],tutor_name:names[i],subject:subjects[i],grade:7,session_format:i%2?'in-person':'online',selected_time:'2026-09-14T16:00:00.000Z',device_type:i<4?'Mobile':'Desktop'}});
}
const response = await fetch(`${host}/batch/`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({api_key:key,batch})});
console.log(`PostHog ingestion HTTP ${response.status}; ${batch.length} labeled events submitted.`);
console.log(await response.text());
if (!response.ok) process.exitCode=1;
