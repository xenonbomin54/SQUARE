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

const { createClient } = supabase;
const _supabase = createClient('https://ixtxxrzqdptsdfxhziic.supabase.co', 'sb_publishable_QuuA_aN2Wndv1E430nX0bQ_0tTkisc8'); 
const SUPABASE_URL = 'https://ixtxxrzqdptsdfxhziic.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_QuuA_aN2Wndv1E430nX0bQ_0tTkisc8';
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function signUp() {
    // 비밀번호 일치 확인
    if (supw.value !== supwC.value) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    const { data, error } = await _supabase.auth.signUp({
        email: suem.value,
        password: supw.value,
        options: {
            data: { nickname: suid.value }
        }
    });

    if (error) alert("가입 실패: " + error.message);
    else alert("가입 성공! 로그인을 진행하세요.");
}

async function signIn() {
    const { data, error } = await _supabase.auth.signInWithPassword({
        email: siid.value,
        password: sipw.value,
    });

    if (error) alert("로그인 실패: " + error.message);
    else {
        alert("로그인 성공!");
        window.location.href = 'index.html'; 
    }
}

const currentPage = window.location.pathname.split("/").pop();

async function checkUser() {
  const { data: { session } } = await _supabase.auth.getSession();

  if (session) {
    console.log('로그인 상태 유지 중:', session.user);
    if (currentPage === 'index.html' || currentPage === 'signin.html' || currentPage === 'signup.html') {
      window.location.href = 'main.html';
    }
  } else {
    console.log('로그인 필요');
    if (currentPage === 'main.html') {
      alert("로그인이 필요합니다.");
      window.location.href = 'index.html';
    }
  }
}

checkUser();


async function und() {
  const { data: { session } } = await _supabase.auth.getSession();
  document.getElementById("userName").innerHTML = session.user.user_metadata.nickname;
}

und();



