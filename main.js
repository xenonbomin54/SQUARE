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
  const { data: { session } } = await _supabase.auth.getSession();
  
  if (!session) {
    alert("로그인이 필요합니다.");
    return;
  }

  const content = document.getElementById('postContent').value;
  const nickname = session.user.user_metadata.nickname;
  if(checkPost(content)) {
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
    document.getElementById('postContent').value = "";
    getPosts();
  }
  }
}

let pageCount = 0;

async function init() {
  const { data: { session } } = await _supabase.auth.getSession();
  const path = window.location.pathname.split("/").pop();

  if (session) {
    if (path === 'index.html' || path === 'signin.html' || path === '') {
      window.location.href = 'main.html';
      return;
    }
    if (path === 'main.html') {
      getPosts();
    }
  } else {
    if (path === 'main.html') {
      window.location.href = 'index.html';
    }
  }
}

function checkPost(text) {
  if (text == "") {
    alert("내용을 입력해주세요");
    return false;
  }
  
  if (text.length < 2) {
    alert("2글자 이상 입력하세요");
    return false;
  }
  
  if (text.length > 100) {
    alert("100자 이하로 입력하세요");
    return false;
  }
  
  return true;
}


async function getPosts(isMore) {
  const { data: { session } } = await _supabase.auth.getSession()
  if (isMore != true) {
    pageCount = 0;
    const list = document.getElementById('postList');
    if (list) list.innerHTML = "";
  }

  const start = pageCount * 10;
  const end = start + 9;

  const result = await _supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(start, end);

  if (result.error) return;

  const rows = result.data;
  const list = document.getElementById('postList');

  for (let i = 0; i < rows.length; i = i + 1) {
    const item = rows[i];
    const box = document.createElement('div');
    box.style = "border-radius: 10px; padding:10px; background:rgb(49, 49, 49); color:rgb(201, 201, 201); width: 70vw; margin: 0 auto; margin-top: 10px; position: relative;";
    
    const writer = "<strong>" + item.author + "</strong>";
    const date = new Date(item.created_at);
    const timeText = " <small style='color:gray;'>" + date.toLocaleString() + "</small>";
    const body = "<p>" + item.content + "</p>";
    box.innerHTML = writer + timeText + body;

    if (session && item.author === session.user.user_metadata.nickname) {
      const morei = document.createElement('img');
      morei.src = "more.png";
      morei.id = "morei";
      morei.style = "position:absolute; top:10px; right:10px; cursor:pointer; width:20px;";

      const menu = document.createElement('div');
      menu.style = "position:absolute; top:35px; right:10px; background:white; border:1px solid #ccc; border-radius:5px; display:none; z-index:10; box-shadow: 0 2px 5px rgba(0,0,0,0.2);";
      
      const delBtn = document.createElement('button');
      delBtn.innerText = "삭제";
      delBtn.style = "border:none; padding:10px; color:red; cursor:pointer; width:100px; background-color : rgb(70,70,70); outline: none; border-radius: 5px;";

      delBtn.onclick = function() { 
        deleteP(item.id);
      };

      morei.onclick = function() {
        if (menu.style.display === "none") {
          menu.style.display = "block";
        } else {
          menu.style.display = "none";
        }
      };

      menu.appendChild(delBtn);
      box.appendChild(morei);
      box.appendChild(menu);
    }
    
    list.appendChild(box);
  } // for문 끝

  pageCount = pageCount + 1;
  const moreBtn = document.getElementById('moreBtn');
  if (moreBtn) {
    moreBtn.style.display = rows.length < 10 ? "none" : "block";
  }
}


init();

async function deleteP(postId) {
  const ask = confirm("이 글을 정말 삭제할까요?");
  if (ask == false) {
    return;
  }

  const { error } = await _supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error != null) {
    alert("삭제 실패");
  } else {
    getPosts();
  }
}

