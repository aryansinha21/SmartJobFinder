function showSection(id){
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Register
function handleRegister(){
  const name=document.getElementById("regName").value.trim();
  const email=document.getElementById("regEmail").value.trim();
  const pw=document.getElementById("regPassword").value;
  const users=load("sjf_users",[]);
  if(users.find(u=>u.email===email)) return alert("User already exists!");
  users.push({id:"u_"+Date.now(),name,email,pw});
  save("sjf_users",users);
  alert("Registered successfully!");
  showSection("login");
}

// Login
function handleLogin(){
  const email=document.getElementById("loginEmail").value.trim();
  const pw=document.getElementById("loginPassword").value;
  const users=load("sjf_users",[]);
  const u=users.find(x=>x.email===email && x.pw===pw);
  if(!u) return alert("Invalid credentials!");
  save("sjf_current",u);
  alert("Welcome "+u.name+"!");
  showSection("dashboard");
  renderEvents();
}

// Render Events
function renderEvents(){
  const list=document.getElementById("eventList");
  const query=document.getElementById("searchBox").value.toLowerCase();
  list.innerHTML="";
  const events=load("sjf_events",[]);
  events
    .filter(e=>!query||e.title.toLowerCase().includes(query)||e.skills.join().toLowerCase().includes(query))
    .forEach(e=>{
      const div=document.createElement("div");
      div.className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all";
      div.innerHTML=`<h3 class="text-lg font-bold text-cyan-300">${e.title}</h3>
                     <p class="text-slate-400">${e.org} – <em>${e.type}</em></p>
                     <p class="text-sm mt-1">${e.desc}</p>
                     <p class="text-sm text-slate-400 mt-1">Skills: ${e.skills.join(", ")}</p>
                     <button class="btn mt-2" onclick="apply('${e.id}')">Apply</button>`;
      list.appendChild(div);
    });
}

// Apply
function apply(eid){
  const u=load("sjf_current",null);
  if(!u) return alert("Login first!");
  const apps=load("sjf_applies",[]);
  if(apps.find(a=>a.eventId===eid && a.userId===u.id)) return alert("Already applied!");
  apps.push({eventId:eid,userId:u.id,at:new Date().toISOString()});
  save("sjf_applies",apps);
  alert("Applied successfully!");
}

// Admin
function adminLogin(){
  const code=document.getElementById("adminCode").value;
  const adm=load("sjf_admin",{code:"admin123",isAdmin:false});
  if(code!==adm.code) return alert("Wrong code!");
  document.getElementById("adminArea").classList.remove("hidden");
}

function addEvent(){
  const t=document.getElementById("evTitle").value.trim();
  const o=document.getElementById("evOrg").value.trim();
  const ty=document.getElementById("evType").value.trim();
  const sk=document.getElementById("evSkills").value.split(",").map(s=>s.trim());
  const d=document.getElementById("evDesc").value.trim();
  if(!t||!o) return alert("Fill all details!");
  const evts=load("sjf_events",[]);
  evts.push({id:"e"+Date.now(),title:t,org:o,type:ty,skills:sk,desc:d});
  save("sjf_events",evts);
  alert("Event added!");
  renderEvents();
}
