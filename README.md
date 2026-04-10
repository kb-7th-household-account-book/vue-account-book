<div align="center">

<img width="120" height="120" alt="noir-vault-logo" src="https://github.com/user-attachments/assets/684191d2-c983-40ff-a644-3e3151f44f21" />

# 느와르 볼트 — NOIR VAULT

> **어둠 속에서 빛나는 자산 관리 시스템**

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-Store-F7D336?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

<br/>

*NOIR(느와르) — 블랙 베이스 다크 UI의 묵직한 감성*  
*VAULT(볼트) — 골드 포인트, 금고 속 자산처럼 단단하게*

</div>

---

## ✨ 개요

**느와르 볼트**는 `Vue 3 + Pinia + OpenAI`를 기반으로 한 **지능형 가계부 관리 시스템**입니다.  
"어제 점심 9000원 김치찌개"처럼 **자연어 한 줄**만으로 지출을 등록하고,  
직관적인 대시보드로 나의 소비 패턴을 한눈에 파악할 수 있습니다.

<br/>

## 🚀 핵심 기능

### 🤖 AI 스마트 등록 — 자연어로 기록하다

| 입력 예시 | 추출 결과 |
|---|---|
| `"어제 점심 9000원 김치찌개"` | 날짜: 어제 / 시간: 12:00 / 금액: 9,000원 / 카테고리: 식비 |
| `"이번달 월세 55만원"` | 날짜: 이번달 1일 / 금액: 550,000원 / 카테고리: 주거비 |
| `"오늘 새벽 편의점 3500"` | 날짜: 오늘 / 시간: 07:00 / 금액: 3,500원 / 카테고리: 편의점 |

> ⏰ **시간 자동 매핑** — 아침·새벽(07:00) / 점심·오후(12:00) / 저녁·밤(18:00)

---

### 📊 홈 대시보드 — 이번 달 한눈에

- **월간 요약** — 지출 / 수입 / 저축률 실시간 분석
- **카테고리 TOP 3** — 바 차트로 시각화된 소비 패턴
- **고정 지출 요약** — 월세, 통신비 등 고정 비용 별도 트래킹

---

### 📝 체계적인 내역 관리

- **멀티 필터링** — 기간 / 금액대 / 카테고리별 정밀 검색
- **정수형 순차 ID** — `json-server` 연동 기반 데이터 무결성 보장
- **생성 / 수정 / 삭제** — 완전한 CRUD 플로우

<br/>

## 🛠 기술 스택

| 구분 | 기술 |
|---|---|
| **Frontend** | Vue 3 (Composition API), Vite, Vue Router |
| **상태 관리** | Pinia |
| **스타일링** | Vanilla CSS — 모바일 반응형 |
| **통신** | Axios, REST API |
| **Mock Backend** | json-server v0.17.4 |
| **AI** | OpenAI API (`gpt-4o-mini`) |

<br/>

## 📂 프로젝트 구조

```
📦 noir-vault
 ┣ 📂 server
 ┃ ┗ 📜 db.json                  # Mock DB (정수형 순차 ID)
 ┣ 📂 src
 ┃ ┣ 📂 api                      # Axios 통신 레이어
 ┃ ┃ ┣ 📜 home.js                # 대시보드 API
 ┃ ┃ ┣ 📜 transactions.js        # 조회 · 필터 API
 ┃ ┃ ┗ 📜 transactionsRegister.js # 등록 · 수정 · 삭제 API
 ┃ ┣ 📂 components               # UI 컴포넌트
 ┃ ┃ ┣ 📂 home                   # 대시보드 구성 요소
 ┃ ┃ ┣ 📂 layout                 # 공통 레이아웃 (Header 등)
 ┃ ┃ ┗ 📂 transaction-register   # 폼, 모달, 리스트 UI
 ┃ ┣ 📂 services
 ┃ ┃ ┗ 📜 aiService.js           # OpenAI 자연어 분석
 ┃ ┣ 📂 store                    # Pinia 전역 상태
 ┃ ┃ ┣ 📜 account.js             # 사용자 정보
 ┃ ┃ ┣ 📜 home.js                # 대시보드 통계
 ┃ ┃ ┗ 📜 transactions.js        # 필터 · 리스트 상태
 ┃ ┣ 📂 styles
 ┃ ┃ ┣ 📜 tokens.css             # CSS 변수 (Color · Spacing · Typography)
 ┃ ┃ ┣ 📜 index.css              # UI 디자인 시스템
 ┃ ┃ ┗ 📜 reset.css              # 브라우저 스타일 초기화
 ┃ ┣ 📂 views
 ┃ ┃ ┣ 📜 Home.vue               # 대시보드 페이지
 ┃ ┃ ┗ 📜 TransactionRegister.vue # 내역 관리 페이지
 ┃ ┣ 📜 App.vue
 ┃ ┗ 📜 main.js
 ┣ 📜 .env.local                  # 환경변수 (Git 제외)
 ┗ 📜 package.json
```
<br/>

## 🎬 시연 영상

<table>

<tr>
<td align="center">

### 🏠 홈  
https://github.com/user-attachments/assets/dff5b341-1842-4e3d-b986-981359d7718d

</td>

<td align="center">

### 📅 캘린더  
https://github.com/user-attachments/assets/efc7ad0a-ec12-46f5-a882-d2078a7a3d69

</td>
</tr>

<tr>
<td align="center">

### 📝 거래 등록  
https://github.com/user-attachments/assets/4cf96b92-0bd6-4caf-96a3-67f156387521

</td>

<td align="center">

### 📊 거래 내역  
https://github.com/user-attachments/assets/276c31a9-a7b5-48bd-a8fe-4eb774caec10

</td>
</tr>

<tr>
<td align="center">

### 👤 마이페이지  
https://github.com/user-attachments/assets/274aff02-b629-4acd-843d-57ddd28334c3

</td>

<td align="center">

### 🎮 게임  

https://github.com/user-attachments/assets/90d60f56-0a73-4dbf-b445-c89004db8404



</td>
</tr>

<tr>
<td align="center" colspan="2">

### 🤖 AI 거래 CRUD  ( 가계부 거래 등록 / 가계부 거래 수정 / 가계부 거래 삭제)
https://github.com/user-attachments/assets/5bcc2143-4acc-4b1d-91d9-3ef0dccc6382

</td>
</tr>

</table>

---

## ⚡ 시작하기

### 1. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 OpenAI API Key를 등록합니다.

```env
VITE_OPENAI_API_KEY=여기에_자신의_OPENAI_API_KEY를_입력하세요
```

> AI 스마트 등록 기능은 API Key 없이는 동작하지 않습니다.

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run start:all
```

> `json-server` (포트 **4000**) + `Vite` 앱 (포트 **5173**) 동시 구동

### 4. 브라우저 접속

```
http://localhost:5173
```

<br/>

## ⚠️ 팀 공지사항

> 협업 시 반드시 숙지해주세요.

**🔢 DB 데이터 룰**  
`db.json`은 **순차적 정수형 ID** 체계로 마이그레이션 되어 있습니다.  
문자열 기반 ID 혼용 시 데이터 무결성이 깨질 수 있으니 주의해주세요.

**🔧 json-server 버전 호환**  
현재 `v0.17.4` 다운그레이드 상태입니다.  
조회 쿼리 작성 시 **구버전 문법**을 사용해야 합니다. (예: `_sort=-date`)  
최신 문법 사용 시 `500 에러`가 발생합니다.

**🗂 Store 역할 분리**  
전역 상태 비대화 방지를 위해 스토어 역할이 명확히 분리되어 있습니다.  
반드시 기능 목적에 맞는 전용 스토어를 사용해주세요.

| 스토어 | 담당 역할 |
|---|---|
| `transactions.js` | 필터링, 검색, 내역 리스트 |
| `home.js` | 대시보드 요약 통계 |
| `account.js` | 사용자 기본 정보 |

---

<div align="center">

**느와르 볼트** — 당신의 자산을 금고처럼, 어둠 속에서 빛나게.

</div>
