function save(k,v){localStorage.setItem(k,JSON.stringify(v));}
function load(k,f){try{return JSON.parse(localStorage.getItem(k))||f;}catch{return f;}}
function seed(){
  if(!localStorage.getItem("sjf_events")){
    save("sjf_events",[
      {id:"e1",title:"AI Hackathon",org:"Tech Society",type:"Hackathon",
       skills:["Python","ML"],desc:"24 hour coding event"},
      {id:"e2",title:"Web Dev Workshop",org:"CS Club",type:"Workshop",
       skills:["HTML","CSS","JS"],desc:"Frontend basics session"}
    ]);
  }
  if(!localStorage.getItem("sjf_users")) save("sjf_users",[]);
  if(!localStorage.getItem("sjf_admin")) save("sjf_admin",{code:"admin123",isAdmin:false});
}
seed();
