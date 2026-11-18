# 🗺️ 나가볼까? - Frontend

> 나가볼까? 의 프론트엔드 레포지토리입니다. 
React + Vite 로 만든 SPA 이며, API 를 호출해 화면을 그리고 Vercel 로 배포합니다.

**🔗 배포 사이트 → https://nagabolkka.vercel.app**

<br>

## 🧩 Implementation

| 구분 | 구현 방식 |
|---|---|
| **인증** | 카카오 인가 코드를 `/oauth/kakao` 에서 받아 백엔드로 넘기고, 받은 Access · Refresh 토큰을 `Authorization` 헤더로 보냅니다. Axios 인터셉터가 401 을 받으면 Refresh 로 토큰을 재발급한 뒤 요청을 다시 보냅니다. |
| **API 레이어** | `src/api/` 에 도메인별 호출 함수를 두고, 화면은 이 함수만 사용합니다. 에러는 서버의 `code` 값(`QUEST_ALREADY_DONE`, `SPLIT_STEP_REQUIRED` 등)으로 분기합니다. |
| **상태 별 화면 분기** | 홈은 서버가 내려주는 `homeState` 에 따라 화면 · 버튼 문구 · 루미 대사를 바꿉니다. 고정 문구와 상수 데이터(시작 체크 문항, 목표 이름, 도움 받기 연락처)는 `src/constants/` 에 둡니다. |
| **화면 간 결과 전달** | 퀘스트 완료 응답을 `location.state` 로 조각 획득 화면에 넘기고, 새로고침으로 state 가 없으면 홈으로 보냅니다. |
| **위치** | Geolocation API 로 받은 좌표를 동네 지도 · 홈 · 오늘 퀘스트 요청에만 쓰고 저장하지 않습니다. 권한 거부 · 위치 못 찾음일 때는 `LocationBanner` 로 켜는 방법을 안내하고, 가입한 구 기준으로 계속 사용할 수 있습니다. |
| **날씨** | 홈 요청에 현재 위치를 함께 보내면 백엔드가 기상청 단기예보로 그 위치의 날씨를 내려줍니다. 받은 날씨로 홈 배경을 바꾸고, 비 오는 날은 RAINY 상태 화면을 보여 줍니다. 위치가 없으면 가입한 구 기준 날씨를 씁니다. |
| **지도** | Kakao Maps JavaScript SDK 로 주변 장소를 표시하고, 상세 정보는 목록 응답 데이터로 그립니다. |
| **안전장치** | 회고 · 연습 대화에서 `crisisDetected: true` 를 받으면 조각 · 복원 연출 없이 도움 받기 화면으로 바로 이동합니다. |
| **중복 요청 방지** | AI 응답을 기다리는 요청(퀘스트 완료, 연습 대화)은 요청 중 버튼을 막아 한 번만 보냅니다. |

<br>

## 🛠️ Tech Stack

| Category | Stack |
|---|---|
| **Framework** | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| **Routing** | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) |
| **HTTP** | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) |
| **Map** | ![Kakao Maps](https://img.shields.io/badge/Kakao_Maps-FFCD00?style=for-the-badge&logo=kakao&logoColor=black) |
| **Auth** | ![Kakao Login](https://img.shields.io/badge/Kakao_Login-FFCD00?style=for-the-badge&logo=kakao&logoColor=black) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) |
| **Deploy** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

<br>

## 📁 Project Structure

```
src/
├── api/          # 도메인별 API 호출 함수
├── pages/        # 화면 단위 컴포넌트
├── components/   # 화면별 · 공통 UI 컴포넌트
├── constants/    # 고정 데이터 (시작 체크 문항 · 목표 이름 · 도움 받기 연락처 등)
├── mocks/        # 지역 · 미션 이미지 / 색 헬퍼
├── utils/        # 위치 · 스토리지 등 유틸
└── main.jsx
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
VITE_KAKAO_REDIRECT_URI=http://localhost:5173/oauth/kakao
```

| Key | Description |
|---|---|
| `VITE_API_BASE_URL` | 백엔드 주소 (운영 `https://api.nagabolkka.shop`) |
| `VITE_KAKAO_REST_API_KEY` | 카카오 디벨로퍼스 REST API 키 |
| `VITE_KAKAO_REDIRECT_URI` | 카카오 로그인 리다이렉트 주소 — 카카오 디벨로퍼스 · 백엔드 허용 목록에 등록된 값이어야 함 (없으면 `400 INVALID_REDIRECT_URI`) |

### ▶️ Run

```bash
npm run dev       # http://localhost:5173
npm run build     # dist/ 로 빌드
npm run preview   # 빌드 결과 미리보기
```

<br>

## 🌐 Deployment

- Vercel 에 GitHub 레포 연결
  - `main` 머지 → 운영 배포
  - `develop` push → Preview 배포
- 빌드 설정은 Vite 기본값 (`npm run build`, 출력 `dist`)
- 환경 변수는 Vercel **Settings → Environment Variables** 에서 관리하며, 바꾸면 **Redeploy** 해야 적용됩니다.

<br>

## 🤝 Convention

### 🌿 Branch

`타입/#이슈번호/명칭` — `develop` 에서 생성 (예: `api/#51/mypage`)

| Branch | Usage |
|---|---|
| `main` | 운영 배포 |
| `develop` | 개발 통합 |
| `feat` · `api` · `fix` · `refactor` · `chore` | 작업 브랜치 |

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