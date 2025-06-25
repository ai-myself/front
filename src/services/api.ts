// API 기본 설정
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// 이미지 업로드 및 관광지 분석 API
export const analyzeLocationImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(`${API_BASE_URL}/analyze-location`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("이미지 분석에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("Location analysis error:", error);
    throw error;
  }
};

// 관상 분석 API
export const analyzePersonality = async (selfieFile: File) => {
  const formData = new FormData();
  formData.append("selfie", selfieFile);

  try {
    const response = await fetch(`${API_BASE_URL}/analyze-personality`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("관상 분석에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("Personality analysis error:", error);
    throw error;
  }
};

// 사용자 위치 기반 주변 행사 조회 API
export const getNearbyEvents = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/nearby-events?lat=${latitude}&lng=${longitude}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("주변 행사 조회에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("Nearby events error:", error);
    throw error;
  }
};

// 성격 타입별 추천 활동 API
export const getRecommendations = async (
  personalityType: string,
  location: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalityType,
        location,
      }),
    });

    if (!response.ok) {
      throw new Error("추천 활동 조회에 실패했습니다.");
    }

    return await response.json();
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
