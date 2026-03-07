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


async function signOut() {
  const { error } = await _supabase.auth.signOut();
  
  if (error) {
    alert("로그아웃 실패: " + error.message);
  } else {
    alert("로그아웃 되었습니다.");
    window.location.href = 'signin.html'; 
  }
}
UMV = 0;
function openUserMenu() {
  const menu = document.getElementById("userMenu");
  if(UMV === 0) {
    menu.style.height = "auto";
    menu.style.padding = "10px";
    menu.style.fontSize = "16px";
    UMV = 1;
  } else {
    menu.style.height = "0px";
    menu.style.padding = "0px";
    menu.style.fontSize = "0px";
    UMV = 0;
  }
}

async function writePost() {
  // 1. 현재 세션에서 작성자 정보 가져오기
  const { data: { session } } = await _supabase.auth.getSession();
  
  if (!session) {
    alert("로그인이 필요합니다.");
    return;
  }

  const content = document.getElementById('postContent').value;
  const nickname = session.user.user_metadata.nickname;

  const { data, error } = await _supabase
    .from('posts')
    .insert([
      { 
        content: content, 
        author: nickname 
      }
    ]);

  if (error) {
    alert("글 등록 실패: " + error.message);
  } else {
    alert("글이 등록되었습니다!");
    document.getElementById('postContent').value = "";
    getPosts();
  }
}

async function getPosts() {
  const result = await _supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  const rows = result.data;
  const error = result.error;

  if (error != null) {
    alert("오류 발생: " + error.message);
    return;
  }

  const list = document.getElementById('postList');
  list.innerHTML = "";

  for (let i = 0; i < rows.length; i = i + 1) {
    const item = rows[i];
    const box = document.createElement('div');
    
    box.style.border = "1px solid #ccc";
    box.style.margin = "10px";
    box.style.padding = "10px";
    box.style.backgroundColor = "#f9f9f9";

    const name = "<strong>" + item.author + "</strong>";
    const time = " <small>" + new Date(item.created_at).toLocaleString() + "</small>";
    const text = "<p>" + item.content + "</p>";

    box.innerHTML = name + time + text;
    
    list.appendChild(box);
  }
}

getPosts();


