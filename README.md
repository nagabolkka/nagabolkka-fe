# ✨ 나가볼까?

> 잃어버린 세상의 조각들 — 방 밖으로 한 걸음씩, 루미와 함께하는 모험

**나가볼까?**는 고립·은둔 청년이 작은 일상 퀘스트를 하나씩 해내며 바깥세상과 다시 연결되도록 돕는 RPG형 모바일 웹 서비스입니다.
빛의 정령 **루미**와 함께 퀘스트를 수행하고, 조각을 모아 잃어버린 지역의 색을 되찾습니다.

## ✨ 주요 기능 

| 기능 | 설명 |
| --- | --- |
| 🔐 온보딩 | 카카오 로그인, 시작 체크 8문항, 출발 지역 배정 |
| 🗺️ 오늘의 퀘스트 | 난이도 · 날씨 · 담아둔 장소 기반 퀘스트, 쪼개기 · 바꾸기 · 건너뛰기 |
| 💎 조각 도감 | 퀘스트 완료로 조각 획득, 5개 지역 복원 |
| 📍 동네 기회 지도 | 내 주변 도서관 · 청년센터 · 프로그램 탐색 및 미션으로 담기 |
| 💬 연습실 | 루미와 AI 롤플레이로 전화 · 방문 · 면접 대화 연습 |
| 📖 모험 일지 | 기분 기록, 주간 흐름, 루미의 편지(주간 리포트) |
| 🆘 도움 받기 | 위기 표현 감지 시 상담 연결 안내 |

## 🛠️ 기술 스택

| 구분 | 기술 스택 | 사용 목적 |
| --- | --- | --- |
| Language | JavaScript | 프론트엔드 개발 |
| Framework | React | 컴포넌트 기반 UI 개발 |
| Build Tool | Vite | 개발 서버 및 빌드 |
| Styling | Tailwind CSS v4 | UI 스타일링, 디자인 토큰 관리 |
| Routing | React Router | 페이지 라우팅 |
| Server State | TanStack Query | 서버 데이터 캐싱 및 동기화 |
| HTTP Client | Axios | 백엔드 REST API 통신 |
| Font | Galmuri11, Pretendard | 픽셀 타이틀 / 본문 |

## 📁 프로젝트 구조

```text
src/
├── api/          # 백엔드 API 통신
├── assets/       # 이미지, 아이콘
├── components/   # 재사용 UI 컴포넌트
├── hooks/        # 커스텀 훅
├── layout/       # 공통 레이아웃 (모바일 393px 프레임)
├── mocks/        # 목업 데이터 (미션 · 조각 · 지역)
├── pages/        # 페이지 컴포넌트
├── router/       # 라우팅 설정
├── stores/       # 전역 상태 관리
├── utils/        # 공통 유틸리티
├── App.jsx
├── main.jsx
└── index.css     # Tailwind 및 디자인 토큰
```

## 🎯 Git Convention

| Type | Description |
| --- | --- |
| 🎉 Start | 프로젝트 시작 |
| ✨ Feat | 새로운 기능 추가 |
| 🐛 Fix | 버그 수정 |
| 🎨 Design | UI 디자인 변경 |
| ♻️ Refactor | 코드 리팩토링 |
| 🔧 Settings | 설정 파일 수정 |
| ➕ Dependency/Plugin | 라이브러리 추가 |
| 📝 Docs | 문서 수정 |
| 🚚 Rename | 파일 및 폴더 이름 수정 |
| 🔥 Remove | 파일 삭제 |

## 🌲 Branch Convention

| Branch | Description |
| --- | --- |
| `main` | 배포 가능한 브랜치 |
| `develop` | 개발 브랜치 |
| `feat/#이슈번호/명칭` | 새로운 기능 개발 |
| `fix/#이슈번호/명칭` | 버그 수정 |
| `ui/#이슈번호/명칭` | UI 작업 |
| `api/#이슈번호/명칭` | API 연동 작업 |