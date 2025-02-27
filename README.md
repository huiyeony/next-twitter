# Next.js + NestJS SNS Application

## 📌 프로젝트 소개
Next.js(프론트엔드)와 NestJS(백엔드)를 활용하여 개발한 **SNS 웹 애플리케이션**입니다. 실시간 데이터 동기화, 커스텀 로그인를 포함한 다양한 기능을 제공합니다.

## 🔥 주요 기능
### 🛠 Backend (NestJS)
- **AWS S3, SQLite**를 활용한 CRUD 기능 구현
- **Socket.io**를 이용한 실시간 데이터 동기화
- **Guard, Cookie**를 활용한 커스텀 로그인
- **Validation Pipeline** 적용하여 DTO 유효성 검사
- **Swagger 문서화**를 통한 API 가이드 제공

### 🎨 Frontend (Next.js)
- **SSR + CSR 렌더링** 방식으로 TTI(Time to Interactive) 단축
- **Zustand 라이브러리**를 사용한 전역 상태 관리
- **TypeScript**를 활용하여 자바스크립트 런타임 에러 방지
- **반응형 UI 설계**를 통한 다양한 디바이스 지원

## ⚡ 기술 스택
- **Frontend**: TypeScript, Next.js, Tailwind CSS, Zustand
- **Backend**: NestJS, SQLite, Socket.io, Swagger

## 🚀 프로젝트 실행 방법
### 1. 환경 변수 설정
`.env` 파일을 프로젝트 루트에 생성하고, 아래 내용을 추가하세요.
```env
DATABASE_URL=sqlite://database.sqlite
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
JWT_SECRET=your_jwt_secret
```

### 2. 백엔드 실행
```bash
cd backend
npm install
npm run start
```

### 3. 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```

## 📡 배포 링크
🔗 [배포된 웹사이트 바로가기](https://wssheep.up.railway.app)

## 📌 API 문서
백엔드 API는 **Swagger**를 활용해 문서화되었습니다. 실행 후 아래 URL에서 API 명세를 확인할 수 있습니다.
🔗 `http://localhost:3000/api`

## 🖼️ 스크린샷
| 로그인 페이지 | 메인 페이지 | 실시간 채팅 |
|--------------|------------|------------|
| ![Login](https://via.placeholder.com/300) | ![Main](https://via.placeholder.com/300) | ![Chat](https://via.placeholder.com/300) |

## 🤝 기여 방법
1. 이 저장소를 Fork합니다.
2. 새로운 브랜치를 생성합니다: `git checkout -b feature/새로운기능`
3. 변경 사항을 커밋합니다: `git commit -m '새로운 기능 추가'`
4. 원격 브랜치로 푸시합니다: `git push origin feature/새로운기능`
5. Pull Request를 생성합니다!

## 📧 문의
문의사항이나 피드백은 언제든지 Issue를 통해 남겨주세요! 🚀

