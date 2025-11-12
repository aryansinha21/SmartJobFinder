function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function load(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v || fallback;
  } catch { return fallback; }
}
function seedData() {
  if (!localStorage.getItem("sjf_events")) {
    save("sjf_events", [
      {id:"e1",title:"AI Hackathon",org:"TechSociety",type:"Hackathon",skills:["python","ml"],desc:"24-hr coding event"},
      {id:"e2",title:"Web Dev Workshop",org:"CS Club",type:"Workshop",skills:["html","css","js"],desc:"Learn frontend basics"}
    ]);
  }
  if (!localStorage.getItem("sjf_users")) {
    save("sjf_users", []);
  }
  if (!localStorage.getItem("sjf_admin")) {
    save("sjf_admin",{code:"admin123",isAdmin:false});
  }
}
seedData();
