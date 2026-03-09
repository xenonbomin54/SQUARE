<div align="center">

  <h3>Supabase 기반의 심플 커뮤니티 플랫폼</h3>

  <p>
    <b>누구나 자유롭게 글을 쓰고 소통하는 미니멀 커뮤니티 공간입니다.</b>
  </p>

</div>

<br/>

## 주요 기능
*   **사용자 인증**: Supabase Auth를 활용한 회원가입 및 로그인 시스템.
*   **실시간 피드**: 유저들이 작성한 게시글을 실시간으로 데이터베이스에서 불러와 공유합니다.
*   **포스트 작성**: 텍스트 기반의 간편한 글쓰기 기능을 제공합니다.
*   **DB 연동**: Supabase DB를 통해 유저 정보와 게시글 데이터를 안전하게 관리합니다.

<br/>

## 기술 스택
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend/DB**: Supabase (Database, Authentication)
- **UI Design**: Minimal & Modern Interface

<br/>

## 프로젝트 구조
```text
SQUARE/
├── index.html       # 랜딩페이지 및 서비스 설명 페이지
├── signin.html       # 사용자 로그인 페이지
├── signup.html       # 사용자 회원가입 페이지
├── main.html       # 게시글 피드 및 업로드 페이지
├── index.css        # 전체 서비스 디자인 및 레이아웃
└── script.js        # Supabase 연동 및 게시글 로직
```

<br/>

## 보안 관련 안내
> **본 프로젝트는 현재 프로토타입 단계로, 개발 편의를 위해 일부 보안 설정이 조정되어 있습니다.**

1.  **RLS(Row Level Security) 비활성화**: 빠른 기능 테스트를 위해 일시적으로 비활성화된 상태입니다. 운영 단계에서는 각 유저의 데이터 접근 권한을 제한하는 정책을 적용할 예정입니다.
2.  **XSS 취약점**: 입력값 검증 및 출력 필터링 로직이 아직 미흡할 수 있습니다. 향후 이스케이프 처리를 통해 보안을 강화할 계획입니다.

<br/>

Developed by @xenonbomin54
© 2024 SQUARE Project
