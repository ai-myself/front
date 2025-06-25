import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  imageUrl: string;
  locationName: string;
  description: string;
}

const LocationInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, locationName, description } =
    location.state as LocationState;

  const handleThankYou = () => {
    // 홈으로 돌아가기
    navigate("/");
  };

  const handleRecommend = () => {
    navigate("/personality-test");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">관광지 정보</h1>
          <p className="text-gray-600">업로드한 사진을 분석한 결과입니다</p>
        </div>

        <div className="space-y-6">
          {/* 이미지 */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={locationName}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              📍 {locationName}
            </div>
          </div>

          {/* 장소 설명 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {locationName}에 대해
            </h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>

            {/* 추가 정보 (실제 API에서 받아올 데이터) */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <div className="text-sm text-gray-500">주변 행사</div>
                <div className="font-medium">봄꽃 축제</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-sm text-gray-500">추천 시간</div>
                <div className="font-medium">오후 3-5시</div>
              </div>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleThankYou}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              고마워!
            </button>
            <button
              type="button"
              onClick={handleRecommend}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              할만 한 걸 추천해줘
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
