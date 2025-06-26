import imageCompression from "browser-image-compression";

// API 기본 설정
const API_BASE_URL =
  'https://gd6haaci2nsqhwvahmf24sir6e0bcpcb.lambda-url.ap-northeast-2.on.aws/api'

// 이미지 업로드 및 관광지 분석 API
export const analyzeLocationImage = async (imageFile: File, coords: { latitude:number; longitude:number; }) => {
  const formData = new FormData();
  formData.append("image", await imageCompression(imageFile, { maxSizeMB: 0.2, maxWidthOrHeight: 1920, useWebWorker: true }));
  formData.append("latitude", coords.latitude.toString());
  formData.append("longitude", coords.longitude.toString());

  try {
    const response = await fetch(`${API_BASE_URL}/tourism/search`, {
      method: "POST",
      body: formData
    });

    return await response.json() as { title: string; imageUrl: string; overview: string; }
  } catch (error) {
    console.error("Location analysis error:", error);
    throw error;
  }
};

// 관상 베이스 추천 API
export const getRecommendations = async (imageFile: File, coords: { latitude:number; longitude:number; }) => {
  try {
    const formData = new FormData();
    formData.append("image",await imageCompression(imageFile, { maxSizeMB: 0.2, maxWidthOrHeight: 1920, useWebWorker: true }));
    formData.append("latitude", coords.latitude.toString());
    formData.append("longitude", coords.longitude.toString());

    const response = await fetch(`${API_BASE_URL}/tourism/recommend`, {
      method: "POST",
      body: formData
    });

    return await response.json() as { travel_type: string; travel_type_description: string; contents: string[]; }
  } catch (error) {
    console.error("Recommendations error:", error);
    throw error;
  }
};

// 위치 정보 가져오기
export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("브라우저가 위치 정보를 지원하지 않습니다."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분
      }
    );
  });
};
