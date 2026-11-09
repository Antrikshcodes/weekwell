const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const DAY_ABBR = ['M','T','W','T','F','S','S'];
const START_HOUR = 8;
const END_HOUR = 16;
const STORAGE_KEY = 'weekwell-events-v1';
const sampleEvents = [
  {id:'s1',name:'Design studio',day:0,start:'09:00',end:'10:30',location:'North Hall · 204',color:'lavender'},
  {id:'s2',name:'World literature',day:0,start:'11:00',end:'12:00',location:'Humanities · 18',color:'peach'},
  {id:'s3',name:'Research methods',day:0,start:'13:00',end:'14:30',location:'Library · Room 3',color:'mint'},
  {id:'s4',name:'Visual systems',day:1,start:'09:30',end:'11:00',location:'Art Building · 12',color:'blue'},
  {id:'s5',name:'Focus block',day:1,start:'13:00',end:'14:30',location:'Personal study',color:'lemon'},
  {id:'s6',name:'Design studio',day:2,start:'09:00',end:'10:30',location:'North Hall · 204',color:'lavender'},
  {id:'s7',name:'Writing workshop',day:2,start:'12:00',end:'13:00',location:'Humanities · 21',color:'rose'},
  {id:'s8',name:'World literature',day:3,start:'10:00',end:'11:00',location:'Humanities · 18',color:'peach'},
  {id:'s9',name:'Research methods',day:3,start:'13:00',end:'14:30',location:'Library · Room 3',color:'mint'},
  {id:'s10',name:'Visual systems',day:4,start:'09:30',end:'11:00',location:'Art Building · 12',color:'blue'},
  {id:'s11',name:'Open studio',day:4,start:'12:30',end:'14:00',location:'Studio · 4B',color:'lavender'},
  {id:'s12',name:'A little breathing room',day:5,start:'10:00',end:'11:00',location:'Just for you',color:'mint'}
];
let events = loadEvents();
let weekOffset = 0;
let toastTimer;
const grid = document.getElementById('scheduleGrid');
const dialog = document.getElementById('eventDialog');
const form = document.getElementById('eventForm');
const byId = id => document.getElementById(id);
const mondayOf = date => { const d = new Date(date); d.setHours(0,0,0,0); d.setDate(d.getDate() - ((d.getDay()+6)%7)); return d; };
function loadEvents(){try{const saved=localStorage.getItem(STORAGE_KEY);return saved?JSON.parse(saved):sampleEvents.map(e=>({...e}));}catch{return sampleEvents.map(e=>({...e}));}}
function saveEvents(){localStorage.setItem(STORAGE_KEY,JSON.stringify(events));}
function fmtDate(d,opts={}){return new Intl.DateTimeFormat('en',{...opts,timeZone:'UTC'}).format(d);}
function currentMonday(){const m=mondayOf(new Date());m.setDate(m.getDate()+weekOffset*7);return m;}
function weekDates(){const mon=currentMonday();return DAYS.map((_,i)=>{const d=new Date(mon);d.setDate(d.getDate()+i);return d;});}
function clockLabel(value){const [h,m]=value.split(':').map(Number);const suffix=h>=12?'pm':'am';return `${h%12||12}${m?':'+String(m).padStart(2,'0'):''}${suffix}`;}
function minutes(value){const [h,m]=value.split(':').map(Number);return h*60+m;}
function updateWeekTitle(dates){const first=dates[0],last=dates[6];const a=fmtDate(first,{month:'short',day:'numeric'}),b=fmtDate(last,{month:'short',day:'numeric'});document.getElementById('weekTitle').textContent=first.getUTCMonth()===last.getUTCMonth()?`${fmtDate(first,{month:'long'})} ${first.getUTCFullYear()} · ${a} – ${fmtDate(last,{day:'numeric'})}`:`${a} – ${b}, ${last.getUTCFullYear()}`;}
function render(){const dates=weekDates();updateWeekTitle(dates);grid.innerHTML='';const corner=document.createElement('div');corner.className='grid-corner';grid.appendChild(corner);const todayStr=new Date().toDateString();dates.forEach((date,i)=>{const head=document.createElement('div');head.className='grid-head'+(date.toDateString()===todayStr?' today':'');head.innerHTML=`<span class="day-name">${DAYS[i].slice(0,3)}</span><span class="day-num">${date.getDate()}</span>`;grid.appendChild(head);});const timeCol=document.createElement('div');timeCol.className='time-column';timeCol.style.gridRow='2';for(let h=START_HOUR;h<=END_HOUR;h++){const label=document.createElement('div');label.className='time-label';label.textContent=clockLabel(`${String(h).padStart(2,'0')}:00`);timeCol.appendChild(label);}grid.appendChild(timeCol);let count=0;for(let day=0;day<7;day++){const col=document.createElement('div');col.className='day-column';col.style.gridColumn=String(day+2);col.style.gridRow='2';const todays=events.filter(e=>e.day===day).sort((a,b)=>a.start.localeCompare(b.start));for(const event of todays){const start=minutes(event.start),end=minutes(event.end);const top=(start-START_HOUR*60)*58/60;const height=(end-start)*58/60;const card=document.createElement('article');card.className=`event ${event.color}`;card.style.top=`${top}px`;card.style.height=`${Math.max(height,43)}px`;card.setAttribute('role','button');card.setAttribute('tabindex','0');card.setAttribute('aria-label',`${event.name}, ${DAYS[event.day]}, ${clockLabel(event.start)} to ${clockLabel(event.end)}${event.location?', '+event.location:''}`);card.innerHTML=`<div class="event-title"></div><div class="event-time">${clockLabel(event.start)} – ${clockLabel(event.end)}</div>${event.location?'<div class="event-location"></div>':''}`;card.querySelector('.event-title').textContent=event.name;if(event.location)card.querySelector('.event-location').textContent=event.location;card.addEventListener('click',()=>openEdit(event.id));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEdit(event.id);}});col.appendChild(card);count++;}if(!todays.length&&day===5&&weekOffset===0){const empty=document.createElement('div');empty.className='empty-state';empty.innerHTML='<strong>A little breathing room.</strong>Enjoy a slower Saturday';col.appendChild(empty);}grid.appendChild(col);}document.getElementById('weekSummary').textContent=count?`${count} ${count===1?'plan':'plans'} this week`:'A good week starts with a plan.';renderMiniWeek(dates);}
function renderMiniWeek(dates){const el=byId('miniWeek');el.innerHTML='';const today=new Date().toDateString();dates.forEach((date,i)=>{const row=document.createElement('div');row.className='mini-day'+(date.toDateString()===today?' today':'');row.innerHTML=`<span class="mini-abbr">${DAY_ABBR[i]}</span><span>${DAYS[i]}</span>`;el.appendChild(row);});}
function resetForm(){form.reset();byId('eventId').value='';byId('eventStart').value='09:00';byId('eventEnd').value='10:00';byId('eventColor').value='lavender';byId('formError').textContent='';byId('deleteBtn').classList.add('hidden');byId('dialogTitle').textContent='Add a class';byId('saveBtn').textContent='Add to week';}
function openAdd(){resetForm();byId('eventDay').value='0';dialog.showModal();byId('eventName').focus();}
function openEdit(id){const event=events.find(e=>e.id===id);if(!event)return;resetForm();byId('dialogTitle').textContent='Edit your plan';byId('saveBtn').textContent='Save changes';byId('deleteBtn').classList.remove('hidden');byId('eventId').value=event.id;byId('eventName').value=event.name;byId('eventDay').value=String(event.day);byId('eventStart').value=event.start;byId('eventEnd').value=event.end;byId('eventLocation').value=event.location||'';byId('eventColor').value=event.color;dialog.showModal();byId('eventName').focus();}
function showToast(message){const el=byId('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300);}
function download(){const data=events.map(e=>`${DAYS[e.day]},${e.start},${e.end},"${e.name.replaceAll('"','""')}","${(e.location||'').replaceAll('"','""')}"`);const csv=['Day,Start,End,Activity,Location',...data].join('\n');const blob=new Blob([csv],{type:'text/csv'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='my-timetable.csv';a.click();URL.revokeObjectURL(url);showToast('Your timetable is ready to download');}
DAYS.forEach((day,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=day;byId('eventDay').appendChild(opt);});
form.addEventListener('submit',e=>{e.preventDefault();const start=byId('eventStart').value,end=byId('eventEnd').value;if(minutes(end)<=minutes(start)){byId('formError').textContent='End time needs to be after the start time.';return;}const id=byId('eventId').value;const item={id:id||`e${Date.now()}`,name:byId('eventName').value.trim(),day:Number(byId('eventDay').value),start,end,location:byId('eventLocation').value.trim(),color:byId('eventColor').value};if(id){events=events.map(e=>e.id===id?item:e);showToast('Your changes are saved');}else{events.push(item);showToast('Added to your week');}saveEvents();dialog.close();render();});
byId('deleteBtn').addEventListener('click',()=>{const id=byId('eventId').value;events=events.filter(e=>e.id!==id);saveEvents();dialog.close();render();showToast('Removed from your week');});
byId('addBtn').addEventListener('click',openAdd);byId('bottomAdd').addEventListener('click',openAdd);byId('cancelBtn').addEventListener('click',()=>dialog.close());byId('closeDialog').addEventListener('click',()=>dialog.close());byId('prevWeek').addEventListener('click',()=>{weekOffset--;render();});byId('nextWeek').addEventListener('click',()=>{weekOffset++;render();});byId('thisWeek').addEventListener('click',()=>{weekOffset=0;render();});byId('todayNav').addEventListener('click',()=>{weekOffset=0;render();});byId('exportBtn').addEventListener('click',download);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
render();
