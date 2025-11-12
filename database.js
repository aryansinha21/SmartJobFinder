function save(k,v){localStorage.setItem(k,JSON.stringify(v));}
function load(k,f){try{return JSON.parse(localStorage.getItem(k))||f;}catch{return f;}}
function seed(){
  if(!localStorage.getItem("sjf_events")){
    const events=[];
    const types=["Hackathon","Workshop","Internship","Seminar","Coding Challenge"];
    const orgs=["Tech Society","IEEE","CSI","Google Club","Innovation Cell"];
    const skills=["Python","ML","AI","Web Dev","C++","Data Science","Cloud"];
    for(let i=1;i<=50;i++){
      events.push({
        id:"e"+i,
        title:`${types[i%5]} ${i}`,
        org:orgs[i%5],
        type:types[i%5],
        skills:[skills[i%7]],
        desc:`An exciting ${types[i%5]} organized by ${orgs[i%5]}.`
      });
    }
    save("sjf_events",events);
  }
  if(!localStorage.getItem("sjf_users")) save("sjf_users",[]);
  if(!localStorage.getItem("sjf_admin")) save("sjf_admin",{code:"admin123",isAdmin:false});
}
seed();
