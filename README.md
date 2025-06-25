# 🗺️ Travel AI Assistant

풍경 사진을 업로드하면 사용자 위치를 기반으로 해당 관광지 정보와 주변 행사를 AI가 분석하여 추천해주는 여행 AI 챗봇입니다.

## ✨ 주요 기능

- **📸 풍경 사진 분석**: 업로드한 사진을 AI가 분석하여 관광지 정보 제공
- **📍 위치 기반 추천**: 사용자 위치를 기반으로 주변 행사 및 이벤트 추천
- **🔮 관상 분석**: 셀카를 통한 관상 분석으로 맞춤형 활동 추천
- **🎯 개인화된 추천**: 성격 타입에 따른 맞춤형 여행 활동 추천

## 🚀 프로젝트 구조

```
travel-ai/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── PhotoUpload.tsx      # 사진 업로드 페이지
│   │   ├── LocationInfo.tsx     # 관광지 정보 페이지
│   │   ├── PersonalityTest.tsx  # 관상 분석 페이지
│   │   └── Recommendations.tsx  # 추천 활동 페이지
│   ├── services/            # API 서비스
│   │   └── api.ts              # API 연동 함수들
│   ├── types/              # TypeScript 타입 정의
│   │   └── index.ts            # 타입 인터페이스
│   ├── App.tsx             # 메인 앱 컴포넌트
│   └── main.tsx            # 앱 진입점
├── public/                 # 정적 파일
└── package.json           # 프로젝트 설정
```

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📱 사용 플로우

1. **사진 업로드**: 풍경 사진을 업로드하여 관광지 분석
2. **관광지 정보 확인**: AI가 분석한 관광지 정보와 주변 행사 확인
3. **관상 분석**: 셀카를 업로드하여 관상 분석 진행
4. **맞춤 추천**: 성격 타입에 따른 개인화된 활동 추천

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

### 환경 변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🔧 API 엔드포인트

### 관광지 분석
- `POST /api/analyze-location`
- 이미지 파일을 업로드하여 관광지 정보 분석

### 관상 분석
- `POST /api/analyze-personality`
- 셀카 이미지를 업로드하여 관상 분석

### 주변 행사 조회
- `GET /api/nearby-events?lat={latitude}&lng={longitude}`
- 사용자 위치 기반 주변 행사 조회

### 추천 활동
- `POST /api/recommendations`
- 성격 타입과 위치 기반 활동 추천

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **그라데이션 배경**: 각 페이지별로 다른 색상 테마
- **로딩 애니메이션**: 사용자 경험 향상을 위한 로딩 상태 표시
- **직관적인 네비게이션**: 명확한 버튼과 안내 메시지

## 🔮 향후 계획

- [ ] 실제 AI 모델 연동 (Google Vision API, OpenAI 등)
- [ ] 위치 기반 서비스 API 연동 (Google Places API, Kakao Map API)
- [ ] 사용자 계정 시스템
- [ ] 여행 히스토리 저장
- [ ] 소셜 기능 (친구와 추천 공유)
- [ ] 다국어 지원

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Travel AI Assistant** - AI와 함께하는 스마트한 여행 경험 🚀
