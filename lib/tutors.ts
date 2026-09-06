export type Tutor = { id: string; name: string; subjects: string[]; grades: number[]; rate: number; photo: string; days: number[]; hours: number[] };
const grades = (a: number, b: number) => Array.from({length:b-a+1},(_,i)=>a+i);
export const tutors: Tutor[] = [
 {id:'maya',name:'Maya Chen',subjects:['Math','Science'],grades:grades(5,8),rate:50,photo:'47',days:[1,3],hours:[16,17]},
 {id:'james',name:'James Wilson',subjects:['Math'],grades:grades(6,12),rate:55,photo:'12',days:[2,4],hours:[17,18]},
 {id:'sofia',name:'Sofia Rivera',subjects:['Reading'],grades:grades(0,6),rate:40,photo:'44',days:[1,5],hours:[15,16]},
 {id:'daniel',name:'Daniel Brooks',subjects:['Science','Math'],grades:grades(7,12),rate:55,photo:'33',days:[3,6],hours:[10,11]},
 {id:'aisha',name:'Aisha Patel',subjects:['Reading','Science'],grades:grades(3,8),rate:45,photo:'49',days:[2,6],hours:[14,15]},
 {id:'emma',name:'Emma Thompson',subjects:['Math','Reading'],grades:grades(0,5),rate:40,photo:'45',days:[4,0],hours:[10,11]},
];
export const gradeLabel = (grade:number) => grade === 0 ? 'Kindergarten' : `Grade ${grade}`;
export const gradeRange = (t:Tutor) => `${t.grades[0]===0?'K':t.grades[0]}–${t.grades.at(-1)}`;
export const scheduleLabel = (t:Tutor) => t.days.map(d=>['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d]).join(' & ') + ' · ' + t.hours.map(h=>`${h>12?h-12:h}${h>=12?'pm':'am'}`).join(', ');
export function slotsFor(t:Tutor) {
 const now=new Date(); const result:string[]=[];
 for(let i=0;i<28;i++){const day=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i); if(!t.days.includes(day.getDay()))continue;
 for(const hour of t.hours){const date=new Date(day);date.setHours(hour,0,0,0);if(date>now)result.push(date.toISOString());}}
 return result;
}
export const slotLabel=(slot:string)=>new Date(slot).toLocaleString('en-US',{weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
export const BOOKING_KEY='abc-bookings-v1';
export type Booking = {id:string;tutorId:string;slot:string;subject:string;grade:number;format:string;status:'pending'};
export function bookings():Booking[]{const value=JSON.parse(localStorage.getItem(BOOKING_KEY)||'[]');if(!Array.isArray(value))throw new Error('Stored requests could not be read. Use the demo reset to start again.');return value;}
export function available(t:Tutor){const saved=bookings();return slotsFor(t).filter(slot=>!saved.some(b=>b.tutorId===t.id&&b.slot===slot));}
export async function reserve(booking:Booking){
 const save=()=>{const t=tutors.find(t=>t.id===booking.tutorId);if(!t||!available(t).includes(booking.slot))throw new Error('That time is no longer available. Please choose another.');localStorage.setItem(BOOKING_KEY,JSON.stringify([...bookings(),booking]));window.dispatchEvent(new Event('abc-bookings'));};
 if(navigator.locks)await navigator.locks.request('abc-bookings',save);else save();
}
