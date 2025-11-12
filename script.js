function showSection(id){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ---------- User functions ----------
async function handleRegister(){
  const name=document.getElementById("regName").value.trim();
  const email=document.getElementById("regEmail").value.trim();
  const pw=document.getElementById("regPassword").value;
  const users=load("sjf_users",[]);
  if(users.find(u=>u.email===email)){
    document.getElementById("regMsg").textContent="User already exists.";
    return;
  }
  users.push({id:"u_"+Date.now(),name,email,pw});
  save("sjf_users",users);
  document.getElementById("regMsg").textContent="Registered successfully!";
}

function handleLogin(){
  const email=document.getElementById("loginEmail").value.trim();
  const pw=document.getElementById("loginPassword").value;
  const users=load("sjf_users",[]);
  const user=users.find(u=>u.email===email && u.pw===pw);
  if(!user){ document.getElementById("loginMsg").textContent="Invalid credentials"; return; }
  save("sjf_current",user);
  document.getElementById("loginMsg").textContent="Login success!";
  showSection("dashboard");
  renderEvents();
}

// ---------- Dashboard ----------
function renderEvents(){
  const list=document.getElementById("eventList");
  list.innerHTML="";
  const query=document.getElementById("searchBox").value.toLowerCase();
  const events=load("sjf_events",[]);
  events.filter(e=>!query||e.title.toLowerCase().includes(query)||e.skills.join().includes(query))
        .forEach(e=>{
          const div=document.createElement("div");
          div.className="event";
          div.style.border="1px solid #475569"; div.style.borderRadius="8px"; div.style.padding="10px"; div.style.margin="6px 0";
          div.innerHTML=`<strong>${e.title}</strong> – ${e.org}<br><em>${e.type}</em><br>${e.desc}<br>
          Skills: ${e.skills.join(", ")}<br>
          <button onclick="apply('${e.id}')">Apply</button>`;
          list.appendChild(div);
        });
}
function apply(eid){
  const u=load("sjf_current",null);
  if(!u){ alert("Login first!"); return; }
  const apps=load("sjf_applies",[]);
  if(apps.find(a=>a.eventId===eid && a.userId===u.id)){ alert("Already applied!"); return; }
  apps.push({eventId:eid,userId:u.id,at:new Date().toISOString()});
  save("sjf_applies",apps);
  alert("Applied successfully!");
}

// ---------- Admin ----------
function adminLogin(){
  const code=document.getElementById("adminCode").value;
  const adm=load("sjf_admin",{code:"admin123",isAdmin:false});
  if(code===adm.code){
    adm.isAdmin=true; save("sjf_admin",adm);
    document.getElementById("adminArea").classList.remove("hidden");
  } else alert("Wrong code!");
}
function addEvent(){
  const t=document.getElementById("evTitle").value.trim();
  const o=document.getElementById("evOrg").value.trim();
  const ty=document.getElementById("evType").value.trim();
  const sk=document.getElementById("evSkills").value.split(",").map(s=>s.trim());
  const d=document.getElementById("evDesc").value.trim();
  const events=load("sjf_events",[]);
  events.push({id:"e"+Date.now(),title:t,org:o,type:ty,skills:sk,desc:d});
  save("sjf_events",events);
  alert("Event added!");
  renderEvents();
}
