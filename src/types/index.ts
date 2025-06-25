// 관광지 분석 결과 타입
export interface LocationAnalysisResult {
  locationName: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  nearbyEvents: Event[];
  bestTimeToVisit: string;
  category: string;
}

// 행사/이벤트 타입
export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  imageUrl?: string;
}

// 관상 분석 결과 타입
export interface PersonalityAnalysisResult {
  personalityType: string;
  confidence: number;
  traits: string[];
  description: string;
}

// 추천 활동 타입
export interface Recommendation {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  cost: "free" | "low" | "medium" | "high";
  location: string;
  imageUrl?: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 사용자 위치 타입
export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

// 페이지 상태 타입
export interface PageState {
  imageUrl: string;
  locationName?: string;
  description?: string;
  selfieUrl?: string;
  personalityType?: string;
  recommendations?: string[];
}
