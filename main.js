function scrpg(){
    window.scroll({
      top: 800,
      left: 0,
      behavior: "smooth"
    });
}

const siid = document.getElementById('ipid');
const sipw = document.getElementById('ippw');
const suid = document.getElementById('ipid2');
const suem = document.getElementById('ipem');
const supw = document.getElementById('ippw2');
const supwC = document.getElementById('ippw3');

function signIn() {
  if (siid.value.trim() == '') {
    alert("Enter ID");
  }else if (sipw.value.trim()==''){
    alert("Enter password")
  }
}

function signUp() {
  if (suid.value.trim() == '') {
    alert("Enter ID")
  }else if(suid.value.length<5 || suid.value.length>15){
    alert("ID must be shorter than 15 and longer than 5")
  }else if (suem.value.trim()==''){
    alert("Enter email");
  } else if (!suem.checkValidity()){
    alert("Email isn't the right format");
  } else if (supw.value.trim()==''){
    alert("Enter password");
  }else if(supw.value.length<5 || supw.value.length>15){
    alert("password must shorter than 15 and longer than 5")
  }else if (supwC.value!==supw.value){
    alert("Re-Entered password does not match with first one");
  }
}

const SUPABASE_URL = '여기에_URL_복사';
  const SUPABASE_KEY = '여기에_ANON_KEY_복사';
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
