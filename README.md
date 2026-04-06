# 가계부 프로젝트 (Household Account Book)

## 📌 프로젝트 개요 
* **주제:** 가계부 서비스 앱
* **기능:** 수입/지출 내역 기록 (날짜, 금액, 카테고리, 메모), 거래 내역 조회, 월별 데이터 요약
* **주요 요건:** 유려한 디자인, 반응형 구조 적용, Composition API
* **개발 인원 및 기간:** 4인, 1주일 진행

## 🛠 사용 기술 (Tech Stack)
* **프론트엔드:** Vue 3 (Composition API 방식)
* **빌드 툴:** Vite (Proxy 및 빌드 역할)
* **라우팅:** Vue Router (SPA 화면 이동)
* **상태 관리:** Pinia (월별, 전체 상태 데이터 전용 보관)
* **API 비동기 통신:** Axios
* **백엔드(Mock DB):** json-server

---

## 📁 4인 협업 최적화 디렉토리 구조 (Architecture)

일주일이라는 짧은 기간 내 충돌(Merge Conflict) 없이 4명의 팀원이 완벽하게 협업할 수 있도록 **역할(Concern)을 명확히 나눈 구조**입니다.

```text
📦 project-root
 ┣ 📂 server             👉 json-server 구동용 임시 백엔드 공간
 ┃ ┗ 📜 db.json          # 수입/지출 내역이 저장될 데이터베이스 파일
 ┣ 📂 src
 ┃ ┣ 📂 api              👉 비동기 서버 통신 코드를 한 장소에 격리
 ┃ ┃ ┗ 📜 index.js       # axios 세팅(http://localhost:4000). 모든 통신은 여기서 한 번만 선언
 ┃ ┣ 📂 router           👉 라우팅 전담 공간
 ┃ ┃ ┗ 📜 index.js       # 3D 홈 화면과 월별 달력 페이지 분기 설정
 ┃ ┣ 📂 store            👉 데이터 상태 전역 관리 (Layer 구분점) 
 ┃ ┃ ┗ 📜 account.js     # Pinia로 '현재 선택된 월'과 '가계부 내역 리스트' 보관
 ┃ ┣ 📂 views            👉 라우터에 의해 바뀌는 메인 렌더링 화면 (Layer 1)
 ┃ ┃ ┣ 📜 Home.vue       # 초기 진입 3D 이미지 화면
 ┃ ┃ ┗ 📜 MonthlyLedger.vue # 월별 가계부가 보여지는 달력 렌더링 도화지 화면
 ┃ ┣ 📂 components       👉 화면을 구성하는 UI 조각 부품 모음 (Layer 2 ~ 4)
 ┃ ┃ ┣ 📜 Home3DImage.vue
 ┃ ┃ ┣ 📜 CalendarBoard.vue # 달력 전체 껍데기와 레이아웃
 ┃ ┃ ┗ 📜 LedgerItem.vue    # 달력 칸 안에 들어갈 하루치 세부 내역/모달 
 ┃ ┣ 📜 App.vue          👉 모든 라우터 페이지가 보여질 빈 도화지 껍데기 (Layer 0)
 ┃ ┗ 📜 main.js          
 ┣ 📜 package.json       👉 npm run start:all 시 서버/앱 동시 켜기 스크립트 작성됨
```

---

## 🚀 프로젝트 실행 방법 (How to Run)

1. **패키지 설치**
   먼저 프로젝트 실행에 필요한 패키지들을 설치해야 합니다. 터미널을 열고 다음 명령어를 입력하세요.
   ```bash
   npm install
   ```

2. **프로젝트 실행 (프론트엔드 + 백엔드 동시 실행)**
   아래 명령어를 실행하면, `json-server`와 `Vite` 개발 서버가 동시에 실행됩니다.
   ```bash
   npm run start:all
   ```

3. **접속**
   실행 후 브라우저에서 `http://localhost:5173` 으로 접속하여 앱을 확인할 수 있습니다.