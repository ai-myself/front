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
    <div className="h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">관광지 정보</h2>
          <p className="text-sm text-gray-600">
            업로드한 사진을 분석한 결과입니다
          </p>
        </div>

        <div className="space-y-4">
          {/* 이미지 */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={locationName}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
              📍 {locationName}
            </div>
          </div>

          {/* 장소 설명 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {locationName}에 대해
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {description}
            </p>

            {/* 추가 정보 (실제 API에서 받아올 데이터) */}
            {/* <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-2">
                <div className="text-xs text-gray-500">주변 행사</div>
                <div className="font-medium text-sm">봄꽃 축제</div>
              </div>
              <div className="bg-white rounded-lg p-2">
                <div className="text-xs text-gray-500">추천 시간</div>
                <div className="font-medium text-sm">오후 3-5시</div>
              </div>
            </div> */}
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleThankYou}
              className="bg-gradient-to-r text-white from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-900 flex-1 py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg text-sm"
            >
              고마워!
            </button>
            <button
              type="button"
              onClick={handleRecommend}
              className="flex-1 py-3 px-4 bg-gradient-to-r text-white from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-900 rounded-lg font-semibold transition-colors shadow-lg text-sm"
            >
              뭐하고 놀까?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
