// --- Navigation ---
function go(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// --- Register ---
function handleRegister(){
  const name=regName.value.trim(), email=regEmail.value.trim(), pw=regPassword.value;
  const users=load("sjf_users",[]);
  if(users.find(u=>u.email===email)) return alert("User already exists!");
  users.push({id:"u"+Date.now(),name,email,pw});
  save("sjf_users",users);
  alert("Registered successfully!");
  go("login");
}

// --- Login ---
function handleLogin(){
  const email=loginEmail.value.trim(), pw=loginPassword.value;
  const users=load("sjf_users",[]);
  const u=users.find(x=>x.email===email&&x.pw===pw);
  if(!u) return alert("Invalid credentials!");
  save("sjf_current",u);
  alert("Welcome "+u.name+"!");
  go("dashboard");
  renderEvents();
}

// --- Logout ---
function logout(){
  localStorage.removeItem("sjf_current");
  go("landing");
}

// --- Render events on dashboard ---
function renderEvents(){
  const list=document.getElementById("eventList");
  list.innerHTML="";
  const query=searchBox.value.toLowerCase();
  const events=load("sjf_events",[]);
  events
    .filter(e=>!query||e.title.toLowerCase().includes(query)
          ||e.skills.join().toLowerCase().includes(query))
    .forEach(e=>{
      const div=document.createElement("div");
      div.className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all";
      div.innerHTML=`<h3 class='text-lg font-bold text-cyan-300'>${e.title}</h3>
        <p class='text-slate-400'>${e.org} – <em>${e.type}</em></p>
        <p class='text-sm mt-1'>${e.desc}</p>
        <p class='text-sm text-slate-400 mt-1'>Skills: ${e.skills.join(", ")}</p>
        <button class='btn mt-2' onclick="apply('${e.id}')">Apply</button>`;
      list.appendChild(div);
    });
}

// --- Apply for event ---
function apply(eid){
  const u=load("sjf_current",null);
  if(!u) return alert("Login first!");
  const apps=load("sjf_applies",[]);
  if(apps.find(a=>a.eventId===eid&&a.userId===u.id)) return alert("Already applied!");
  apps.push({eventId:eid,userId:u.id,at:new Date().toISOString()});
  save("sjf_applies",apps);
  alert("Applied successfully!");
}

// --- Admin ---
function adminLogin(){
  const code=adminCode.value;
  const adm=load("sjf_admin",{code:"admin123",isAdmin:false});
  if(code!==adm.code) return alert("Wrong code!");
  adminArea.classList.remove("hidden");
}
function addEvent(){
  const t=evTitle.value.trim(), o=evOrg.value.trim(), ty=evType.value.trim(),
        sk=evSkills.value.split(",").map(s=>s.trim()), d=evDesc.value.trim();
  if(!t||!o) return alert("Fill all details!");
  const evts=load("sjf_events",[]);
  evts.push({id:"e"+Date.now(),title:t,org:o,type:ty,skills:sk,desc:d});
  save("sjf_events",evts);
  alert("Event added!");
  renderEvents();
}
