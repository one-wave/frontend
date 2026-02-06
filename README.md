# 🦽 배리어 프리 (Barrier Free)

> 장애인 구직자와 기업을 연결하는 웹 접근성 중심 채용 플랫폼

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Emotion](https://img.shields.io/badge/Emotion-11.14.0-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

</div>

---

## 📑 목차

- [주요 기능](#-주요-기능)
- [아키텍처](#-아키텍처)
- [기술 스택](#-기술-스택)
- [디렉토리 구조](#-디렉토리-구조)
- [시작하기](#-시작하기)

---

## ✨ 주요 기능

### 1. 🔐 로그인 & 회원가입 기능
- 개인 회원(구직자)과 기업 회원 분리
- 탭 방식 인터페이스로 사용자 유형 선택
- 이메일/비밀번호 기반 인증
- 비밀번호 표시/숨김 토글

### 2. 🎯 장애인 맞춤 기업 매칭 기능
- **장애 유형별 필터링**: 지체장애, 시각장애, 청각장애
- **근무 조건 필터**: 휠체어 접근 가능, 재택 근무, 탄력 근무제, 근로지원인 지원
- **편의시설 정보**: 경사로, 엘리베이터, 점자 블록, 수어 통역 등
- **AI 3줄 요약**: 채용 공고 핵심 내용 자동 요약
- **TTS(Text-to-Speech)**: 공고 내용 음성 읽기

### 3. 📝 회사 지원하기 기능
- 채용 공고 상세 정보 확인
- 급여, 근무 시간, 고용 형태, 위치 정보 제공
- 업무 내용, 자격 요건, 우대 사항 안내
- 근무 환경 및 편의시설 상세 정보
- 스크랩 및 지원하기 버튼

### 4. 👤 장애별 맞춤 근무 설정 마이페이지
- **프로필 관리**: 이름, 소개글 수정
- **이력서 관리**: PDF 업로드/교체/삭제
- **맞춤형 편의시설 설정**:
  - 물리적 환경: 휠체어 경사로, 전용 화장실, 점자 블록, 엘리베이터
  - 업무 지원: 스크린 리더, 수어 통역, 확대 모니터
  - 근무 형태: 재택 근무 필수, 시차 출퇴근제, 단시간 근로

### 5. 📊 기업용 지원자 현황 대시보드
- 총 지원자 수 통계 (신규 지원 알림)
- 최근 지원자 목록 테이블
- 지원자 정보: 이름, 지원 직무, 장애 유형, 지원 날짜
- 상태 관리: 서류 검토중, 면접 예정, 불합격 등
- 사이드바 네비게이션 (대시보드/공고 관리/설정)

### 6. 📢 공고 관리 페이지
- **기본 정보 입력**: 공고 제목, 채용 직무, 연봉, 근무지
- **상세 내용 작성**: 직무 설명, 자격 요건
- **편의시설 선택**: 8가지 편의시설 체크박스 (휠체어 경사로, 엘리베이터, 점자 블록, 수어 통역, 확대 모니터, 재택 근무 등)
- 임시 저장 및 공고 등록 기능

---

## 🏗️ 아키텍처

### 페이지별 라우팅 구조

```mermaid
graph TD
    A[/ Root] --> B[UserMainPage<br/>구직정보/공모전/교육]
    A --> C[/login<br/>Login]
    A --> D[/signup<br/>SignUp]
    
    A --> E[User Routes]
    E --> F[/user/job/:jobId<br/>JobDetailPage]
    E --> G[/user/mypage<br/>MyPage]
    E --> H[/user/interview<br/>InterviewAssistantPage]
    
    A --> I[Company Routes]
    I --> J[/company/dashboard<br/>CompanyDashboardPage]
    I --> K[/company/job-post<br/>JobPostPage]
    
    style A fill:#0b4da2,color:#fff
    style B fill:#4CAF50,color:#fff
    style C fill:#FF9800,color:#fff
    style D fill:#FF9800,color:#fff
    style E fill:#2196F3,color:#fff
    style I fill:#9C27B0,color:#fff
```

---

## 🛠️ 기술 스택

### 빌드 도구
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![npm](https://img.shields.io/badge/npm-latest-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### 언어 & 프레임워크
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)

### 라우팅
![React Router](https://img.shields.io/badge/React_Router-7.13.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### 스타일링
![Emotion](https://img.shields.io/badge/Emotion-11.14.0-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-0.563.0-8B5CF6?style=for-the-badge&logo=lucide&logoColor=white)

### 상태 관리
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.90.20-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

### 배포
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📂 디렉토리 구조

```
frontend/
├── public/                      # 정적 파일
├── src/
│   ├── app/                     # 애플리케이션 코어
│   │   ├── App.jsx             # 루트 컴포넌트
│   │   └── Router.jsx          # 라우팅 설정
│   │
│   ├── pages/                   # 페이지 컴포넌트
│   │   ├── auth/               # 인증 관련 페이지
│   │   │   ├── Login.jsx       # 로그인 (개인/기업)
│   │   │   └── SignUp.jsx      # 회원가입
│   │   │
│   │   ├── user/               # 구직자 페이지
│   │   │   ├── UserMainPage.jsx           # 메인 (구직/공모전/교육)
│   │   │   ├── JobDetailPage.jsx          # 채용 공고 상세
│   │   │   ├── MyPage.jsx                 # 마이페이지
│   │   │   └── InterviewAssistantPage.jsx # 면접 도우미
│   │   │
│   │   └── company/            # 기업 페이지
│   │       ├── CompanyDashboardPage.jsx   # 지원자 현황
│   │       └── JobPostPage.jsx            # 공고 작성
│   │
│   ├── shared/                  # 공통 컴포넌트
│   │   ├── Header.jsx          # 구직자용 헤더
│   │   └── CompanyHeader.jsx   # 기업용 사이드바 레이아웃
│   │
│   ├── features/                # 기능별 모듈 (예정)
│   ├── styles/                  # 전역 스타일
│   │   └── reset.css           # CSS 리셋
│   │
│   └── main.jsx                 # 진입점
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

---

## 🎯 접근성 특화 기능

- ♿ **장애 유형별 맞춤 필터링**
- 🔊 **TTS (Text-to-Speech)**: 공고 내용 음성 읽기
- 🎤 **STT (Speech-to-Text)**: 면접 도우미 음성 인식
- 🤖 **AI 요약**: 채용 공고 핵심 3줄 요약
- 🏢 **편의시설 정보**: 휠체어, 점자, 수어 통역 등 상세 제공

---

## 📝 라이선스

This project is licensed under the MIT License.

---

<div align="center">
  <p>Made with ❤️ for Accessibility</p>
  <p>© 2026 배리어 프리 (Barrier Free)</p>
</div>
