# ✈️ 나가볼까? - Frontend

> 나가볼까? 의 프론트엔드 레포지토리입니다.
React + Vite 로 만든 SPA(PWA) 이며, API 를 호출해 화면을 그리고 Vercel 로 배포합니다.

**🔗 배포 사이트 → https://nagabolkka.vercel.app**

<br>

## 🧩 Implementation

| 구분 | 구현 방식 |
|---|---|
| **인증** | 카카오 인가 코드를 `/oauth/kakao` 에서 받아 백엔드로 넘기고, 받은 Access · Refresh 토큰을 `Authorization` 헤더로 보냅니다. Axios 인터셉터가 401 을 받으면 Refresh 로 토큰을 재발급한 뒤 요청을 다시 보냅니다. |
| **API 레이어** | `src/api/` 에 도메인별 호출 함수를 두고, 화면은 이 함수만 사용합니다. 에러는 서버의 `code` 값(`QUEST_ALREADY_DONE`, `SPLIT_STEP_REQUIRED` 등)으로 분기합니다. |
| **디자인 시스템** | 여권 · 마음 군도 세계관으로 색 · 글꼴 토큰(네이비 · 금장 · 종이 · 기분 잉크 5색, Noto Serif KR)을 Tailwind v4 `@theme` 에 두고, 탑승권 · 입국 도장 · 떠 있는 섬 · 기장 루미를 공통 컴포넌트(`components/common`)로 씁니다. 그림은 모두 SVG(`assets/lumi`, `assets/islands`)입니다. |
| **섬 매핑** | 서버의 지역 `stageNo` 1-5 를 `constants/islands.js` 에서 섬(쉼 · 용기 · 발견 · 연결 · 꿈)의 이름 · 색 · 편명으로 바꿔 보여 줍니다. 복원도(0-100)는 20 단위로 섬 불빛 0-5개가 됩니다. |
| **상태 별 화면 분기** | 홈은 서버가 내려주는 `homeState` 에 따라 화면 · 버튼 문구 · 루미 대사를 바꿉니다. 다음 섬 제안(`nextRegionSuggestion`)이 있으면 홈보다 먼저 새 탑승권 전체 화면을 띄웁니다. 고정 문구와 상수 데이터(출국 심사 문항, 꿈 목표, 도움 받기 연락처)는 `src/constants/` 에 둡니다. |
| **화면 간 결과 전달** | 퀘스트 완료 응답을 `location.state` 로 도장 획득 화면에 넘기고, 새로고침으로 state 가 없으면 홈으로 보냅니다. |
| **위치** | Geolocation API 로 받은 좌표를 동네 지도 · 홈 · 오늘 퀘스트 요청에만 쓰고 저장하지 않습니다. 권한 거부 · 위치 못 찾음일 때는 `LocationBanner` 로 켜는 방법을 안내하고, 가입한 구 기준으로 계속 사용할 수 있습니다. |
| **날씨** | 홈 요청에 현재 위치를 함께 보내면 백엔드가 기상청 단기예보로 그 위치의 날씨를 내려줍니다. 비 오는 날은 섬에 비 구름을 띄우고 RAINY 상태 화면을 보여 줍니다. 위치가 없으면 가입한 구 기준 날씨를 씁니다. |
| **지도** | Kakao Maps JavaScript SDK 로 주변 장소를 표시하고, 상세 정보는 목록 응답 데이터로 그립니다. |
| **PWA · 알림** | `manifest.webmanifest` 와 기장 루미 아이콘으로 홈 화면에 설치할 수 있고, 로그인된 상태로 다시 열면 인트로 없이 바로 홈으로 갑니다. 푸시 알림은 Firebase Cloud Messaging(`firebase-messaging-sw.js`)으로 받습니다. |
| **애니메이션** | 도장을 받을 때 입국 도장이 쾅 찍히는 CSS 애니메이션을 쓰고, 기기의 「동작 줄이기」 설정이 켜져 있으면 생략합니다. |
| **안전장치** | 회고 · 연습 대화에서 `crisisDetected: true` 를 받으면 도장 · 불빛 연출 없이 도움 받기 화면으로 바로 이동합니다. |
| **중복 요청 방지** | AI 응답을 기다리는 요청(퀘스트 완료, 연습 대화)과 다음 섬 응답 · 난이도 바꾸기는 요청 중 버튼을 막아 한 번만 보냅니다. |

<br>

## 🛠️ Tech Stack

**Framework**

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

**Styling**

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Pretendard](https://img.shields.io/badge/Pretendard-1C2A5E?style=flat-square)
![Noto Serif KR](https://img.shields.io/badge/Noto_Serif_KR-D2B36B?style=flat-square&logo=googlefonts&logoColor=1C2A5E)

**Routing · State · HTTP**

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

**Map · Auth**

![Kakao Map](https://img.shields.io/badge/Kakao_Map-FFCD00?style=flat-square&logo=kakao&logoColor=black)
![Kakao Login](https://img.shields.io/badge/Kakao_Login-FFCD00?style=flat-square&logo=kakao&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

**PWA · Push**

![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![Firebase Cloud Messaging](https://img.shields.io/badge/Firebase_Cloud_Messaging-FFCA28?style=flat-square&logo=firebase&logoColor=black)

**Deploy · Tooling**

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

**Design**

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)

<br>

## 📁 Project Structure

```
src/
├── api/          # 도메인별 API 호출 함수
├── assets/       # 기장 루미 · 섬 SVG (lumi/ · islands/)
├── components/   # 화면별 · 공통 UI 컴포넌트 (common/ : 탑승권 · 입국 도장 · 떠 있는 섬 · 루미 · 버튼)
├── constants/    # 고정 데이터 (섬 · 기분 잉크 · 출국 심사 문항 · 꿈 목표 · 도움 받기 연락처 등)
├── hooks/        # 오늘 퀘스트 · 음성 녹음 훅
├── layout/       # 공통 레이아웃
├── pages/        # 화면 단위 컴포넌트
├── router/       # 라우트 정의
├── stores/       # 전역 상태 (Zustand)
├── utils/        # 위치 · 스토리지 · 조사 등 유틸
├── firebase.js   # FCM 초기화
└── main.jsx
public/
├── manifest.webmanifest       # PWA 설정 (네이비 테마 · 아이콘)
└── firebase-messaging-sw.js   # 푸시 알림 서비스 워커
vercel.json       # SPA 새로고침 404 방지 rewrite
```

<br>

## 🚀 Getting Started

### 📦 Install

```bash
git clone https://github.com/nagabolkka/nagabolkka-fe.git
cd nagabolkka-fe
npm install
```

### 🔑 Environment Variables

루트에 `.env.local` 을 만듭니다. (커밋하지 않음)

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_KAKAO_REST_API_KEY=
VITE_KAKAO_JS_KEY=
VITE_KAKAO_REDIRECT_URI=http://localhost:5173/oauth/kakao

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_VAPID_KEY=
```

| Key | Description |
|---|---|
| `VITE_API_BASE_URL` | 백엔드 주소 (운영 `https://api.nagabolkka.shop`) |
| `VITE_KAKAO_REST_API_KEY` | 카카오 디벨로퍼스 REST API 키 (로그인) |
| `VITE_KAKAO_JS_KEY` | 카카오 디벨로퍼스 JavaScript 키 (지도 SDK) |
| `VITE_KAKAO_REDIRECT_URI` | 카카오 로그인 리다이렉트 주소 — 카카오 디벨로퍼스 · 백엔드 허용 목록에 등록된 값이어야 함 (없으면 `400 INVALID_REDIRECT_URI`) |
| `VITE_FIREBASE_*` | Firebase 웹 앱 설정 값 (콘솔 → 프로젝트 설정 → 내 앱) |
| `VITE_FIREBASE_VAPID_KEY` | 웹 푸시 인증서 키 (콘솔 → 클라우드 메시징 → 웹 구성) |

### ▶️ Run

```bash
npm run dev       # http://localhost:5173
npm run build     # dist/ 로 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint      # ESLint
```

<br>

## 🌐 Deployment

- Vercel 에 GitHub 레포 연결
  - `main` 머지 → 운영 배포
  - `develop` push → Preview 배포
- 빌드 설정은 Vite 기본값 (`npm run build`, 출력 `dist`)
- 환경 변수는 Vercel **Settings → Environment Variables** 에서 관리하며, 바꾸면 **Redeploy** 해야 적용됩니다.
- PWA 아이콘을 바꾸면 이미 설치한 아이폰은 홈 화면 앱을 지우고 다시 추가해야 새 아이콘이 보입니다.

<br>

## 🤝 Convention

### 🌿 Branch

`타입/#이슈번호/명칭` — `develop` 에서 생성 (예: `api/#51/mypage`)

| Branch | Usage |
|---|---|
| `main` | 운영 배포 |
| `develop` | 개발 통합 |
| `feat` · `api` · `fix` · `refactor` · `design` · `chore` | 작업 브랜치 |

### 💬 Commit

`이모지 Type: 내용` (이슈 번호 없음)

| Type | Usage |
|---|---|
| ✨ Feat | 새 기능 |
| 🐛 Fix | 버그 수정 |
| ♻️ Refactor | 리팩토링 |
| ✅ Test | 테스트 |
| 🔧 Settings | 설정 파일 · 의존성 |
| 🧹 Chore | 기능 변화 없는 정리 |
| 🚀 Deploy | 배포 · CI/CD |
| 📝 Docs | 문서 |

### 🔀 Pull Request

`[타입/#이슈번호] 내용` — 예: `[API/#51] 마이페이지 내 정보 조회 · 목표 변경 연동`
배포 PR (develop → main) 은 `[DEPLOY] 내용`