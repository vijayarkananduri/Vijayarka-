const projects=[
 ['Kosha','Zero-cloud, AES-256 encrypted Android identity vault.','Security / Android',null],
 ['Centrum OS','Bootable Linux environment with a context-aware terminal.','Systems / Shell','https://github.com/vijayarkananduri/centrum-os'],
 ['Metabasis','Privacy-first Android step instrument with a tactile hardware dashboard.','Android / Offline','https://github.com/vijayarkananduri/metabasis'],
 ['MAWO','Neuroscience-backed habit tracker with an evolving Alive UI.','HCI / Alive UI','https://mawo.netlify.app/'],
 ['FLEXRUN','An offline browser game controlled by body movement.','Computer vision / GameDev',null],
 ['Almara','A file manager that uses auto-expiring virtual folders.','Android / Privacy',null],
 ['NSLV-19','Hardware lead for Andhra Pradesh’s first balloon satellite.','Aerospace / Hardware',null],
 ['Epochs','An XAI platform for reinforcement-learning calibration research.','ML / Explainable AI','https://github.com/vijayarkananduri/epochs-code'],
 ['Draftsync','Local-first writing app with a custom shortcut engine.','Productivity / Local-first','https://draftb00k.netlify.app/'],
 ['Tenet','Emotion-tracking journal with real-time visual feedback.','HCI / Emotion-aware','https://tenett.netlify.app/'],
 ['DesignRx','AI-powered diagnostic tool for reading a website’s personality.','AI / Web design','https://thedesignrx.netlify.app/'],
 ['Echo','A sound-first horror game where every sonar pulse reveals your position.','GameDev / JavaScript','https://vijayarka.itch.io/echo'],
 ['Logbook','A private second brain with a local NLP engine and nine categories.','NLP / Privacy','https://thelogbook.netlify.app/'],
 ['Ek Indian Bacha','A Hinglish satire game about the Indian student experience.','GameDev / Culture','https://ekindianbacha.netlify.app/'],
 ['Draftbook','A silent AI writing assistant that gives feedback without breaking flow.','AI / Writing','https://draftb00k.netlify.app/']
];
const papers=[
 ['01','Designing Alive UI in MAWO','A case study on stimuli-driven interface evolution for habit formation.','HCI · Alive UI','https://zenodo.org/records/16889414'],
 ['02','Self-Narrating Neural Networks','Real-time natural-language explanations during machine-learning training.','Deep Learning · XAI','https://zenodo.org/records/17310054'],
 ['03','Designing Emotion-Aware AI Writing Tools','A research study on Draftbook and emotionally intelligent creative assistance.','AI · Writing · UX','https://zenodo.org/records/15865688']
];
const books=[
 ['Newton’s Law of Love','What if every heartbreak had a formula? Prose poetry mapped through gravity, velocity and force.','Amazon Kindle','https://www.amazon.in/dp/B0GZVLSZ3Q/'],
 ['Write It Right, Get It Right','A beginner-friendly guide to giving AI the right instructions, with templates and exercises.','Open free','https://vijayarka.notion.site/Write-It-Right-Get-It-Right-21725fbad98b8030a46ccc8ba43a132a'],
 ['The Chemistry of Love','Love as a reaction. Heartbreak as entropy. Prose poetry about what bonds, dissolves and remains.','Amazon Kindle','https://www.amazon.in/dp/B0GZPYV842/'],
 ['Ancient Echoes','An episodic audio fiction series set in a world like ancient India.','PocketFM','https://pocketfm.onelink.me/2IE7/s6fj1j8m']
];
const classes=[['Warrior','Action, games & creative projects'],['Mage','Research, books & ideas'],['Recruiter','Selected work & capabilities'],['Student','Learning & methodology'],['Spectator','Random destinations & stories'],['Wanderer','Explore without a formal class']];
const quests=[
 {id:'project',title:'Enter the Arcade',desc:'Discover one artifact in the project district.',xp:20,anchor:'#projects'},
 {id:'paper',title:'Open the Archives',desc:'Visit the research shelf and inspect a paper.',xp:25,anchor:'#archives'},
 {id:'book',title:'Pull a Spine',desc:'Open a book or the Ancient Echoes transmission.',xp:25,anchor:'#library'}
];
const emptyState=()=>({name:'',class:'Wanderer',xp:0,visited:[],quests:[],created:false});
let state; try{state=JSON.parse(localStorage.getItem('vn-living-portfolio')||'null')||emptyState();}catch{state=emptyState();}
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem('vn-living-portfolio',JSON.stringify(state));renderProfile();renderQuests();}
function renderProjects(){ $('#projectGrid').innerHTML=projects.map((p,i)=>`<article class="project-card" data-project="${i}"><div><div class="project-num">${String(i+1).padStart(2,'0')} / ${p[2]}</div><h3>${p[0]}</h3><p>${p[1]}</p><div class="tag-row"><span class="tag">${p[2].split(' / ')[0]}</span>${p[2].includes(' / ')?`<span class="tag">${p[2].split(' / ')[1]}</span>`:''}</div></div>${p[3]?`<a class="card-link" href="${p[3]}" target="_blank" rel="noreferrer" data-track="project">Open artifact ↗</a>`:''}</article>`).join(''); }
function renderPapers(){ $('#paperList').innerHTML=papers.map(p=>`<article class="paper"><span class="paper-num">${p[0]}</span><div><h3>${p[1]}</h3><p>${p[2]}<br><span class="eyebrow">${p[3]}</span></p></div><a href="${p[4]}" target="_blank" rel="noreferrer" data-track="paper">Read ↗</a></article>`).join(''); }
function renderBooks(){ $('#bookGrid').innerHTML=books.map((b,i)=>`<article class="book"><div><div class="book-spine">${i===3?'AUDIO FICTION':'BOOK / '+String(i+1).padStart(2,'0')}</div><h3>${b[0]}</h3><p>${b[1]}</p></div><a href="${b[3]}" target="_blank" rel="noreferrer" data-track="book">${b[2]} ↗</a></article>`).join(''); }
function renderClasses(){ $('#classGrid').innerHTML=classes.map(c=>`<button class="class-option ${state.class===c[0]?'selected':''}" data-class="${c[0]}"><b>${c[0]}</b><br><small>${c[1]}</small></button>`).join(''); $$('.class-option').forEach(b=>b.onclick=()=>{state.class=b.dataset.class;renderClasses();$('#enterClass').textContent=state.class;}); }
function renderProfile(){const name=state.name||'Wanderer';$('#profileLabel').textContent=name;$('#profileTitle').textContent=name;$('#profileClass').textContent=state.class==='Wanderer'?'Anonymous explorer':state.class+' class';$('#xpNum').textContent=state.xp;$('#levelNum').textContent=Math.floor(state.xp/50)+1;$('#xpBar').style.width=(state.xp%50*2)+'%';const visited=state.visited.length;$('#stats').innerHTML=[['places',visited],['quests',state.quests.length],['projects',state.visited.includes('projects')?1:0],['papers',state.visited.includes('archives')?1:0]].map(x=>`<div class="stat"><b>${x[1]}</b><span>${x[0]}</span></div>`).join('');}
function renderQuests(){ $('#questList').innerHTML=quests.map(q=>{const done=state.quests.includes(q.id);return `<article class="quest ${done?'done':''}"><h3>${done?'✓ ':''}${q.title}</h3><p>${q.desc}</p><small>${done?'COMPLETED':'+'+q.xp+' XP'}</small></article>`}).join(''); $('.quest-count').textContent=quests.filter(q=>!state.quests.includes(q.id)).length; }
function completeQuest(id){if(state.quests.includes(id))return;const q=quests.find(x=>x.id===id);if(q){state.quests.push(id);state.xp+=q.xp;save();}}
function visit(dest){const coords={start:[12,57],archives:[38,12],library:[61,60],projects:[84,42],journey:[70,10],connect:[85,70]};const [x,y]=coords[dest]||coords.start;$('#player').style.left=x+'%';$('#player').style.top=y+'%';$('#mapStatus').textContent='Travelling to '+dest+'…';$$('.landmark').forEach(x=>x.classList.toggle('active',x.dataset.dest===dest));if(!state.visited.includes(dest)){state.visited.push(dest);state.xp+=10;save();}setTimeout(()=>{$('#mapStatus').textContent='Arrived at '+dest; if(dest==='projects')completeQuest('project');if(dest==='archives')completeQuest('paper');if(dest==='library')completeQuest('book');if(dest!=='start'&&document.querySelector('#'+dest))document.querySelector('#'+dest).scrollIntoView({behavior:'smooth',block:'start'});},700);}
function openModal(){renderClasses();$('#characterModal').hidden=false;$('#nameInput').value=state.name||'';$('#enterClass').textContent=state.class;}
function closeModal(){ $('#characterModal').hidden=true; }
function enterWorld(anon=false){state.name=anon?'':($('#nameInput').value.trim()||'Wanderer');state.created=true;save();closeModal();visit('start');}
renderProjects();renderPapers();renderBooks();renderProfile();renderQuests();
$$('.landmark').forEach(b=>b.onclick=()=>visit(b.dataset.dest));
$('#startBtn').onclick=()=>state.created?visit('start'):openModal();$('#enterBtn').onclick=()=>enterWorld(false);$('#skipBtn').onclick=()=>enterWorld(true);$('#surpriseBtn').onclick=()=>{const dest=['projects','archives','library','journey','connect'][Math.floor(Math.random()*5)];visit(dest);};
$('#questBtn').onclick=()=>{$('#questDrawer').classList.add('open');$('#questDrawer').setAttribute('aria-hidden','false')};$('#questClose').onclick=()=>$('#questDrawer').classList.remove('open');$('#profileBtn').onclick=()=>{$('#profileDrawer').classList.add('open');$('#profileDrawer').setAttribute('aria-hidden','false')};$('#profileClose').onclick=()=>$('#profileDrawer').classList.remove('open');
$('#resetBtn').onclick=()=>{if(confirm('Reset this journey?')){state=emptyState();save();location.reload();}};$('#profileReset').onclick=()=>{if(confirm('Reset your character and progress?')){state=emptyState();save();$('#profileDrawer').classList.remove('open');openModal();}};
$$('[data-close]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).hidden=true);document.addEventListener('click',e=>{const a=e.target.closest('[data-track]');if(a){completeQuest(a.dataset.track);}});
if(!state.created)setTimeout(openModal,500);
