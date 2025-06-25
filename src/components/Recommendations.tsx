import { useLocation, useNavigate } from "react-router-dom";

interface RecommendationsState {
  selfieUrl: string;
  personalityType: string;
  recommendations: string[];
}

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selfieUrl, personalityType, recommendations } =
    location.state as RecommendationsState;

  const handleBackToHome = () => {
    navigate("/");
  };

  const getPersonalityEmoji = (type: string) => {
    const emojiMap: { [key: string]: string } = {
      "활발한 외향형": "🌟",
      "차분한 내향형": "🌙",
      "창의적인 예술형": "🎨",
      "논리적인 분석형": "🔬",
      "친화적인 사회형": "🤝",
      "모험적인 탐험형": "🗺️",
    };
    return emojiMap[type] || "✨";
  };

  const getPersonalityDescription = (type: string) => {
    const descriptions: { [key: string]: string } = {
      "활발한 외향형":
        "사람들과의 소통을 즐기고 새로운 경험을 추구하는 성격이에요. 다양한 활동과 모임을 통해 에너지를 얻는 타입입니다.",
      "차분한 내향형":
        "조용하고 깊이 있는 경험을 선호하는 성격이에요. 혼자만의 시간을 통해 에너지를 충전하는 타입입니다.",
      "창의적인 예술형":
        "예술적 감각이 뛰어나고 독창적인 아이디어를 가진 성격이에요. 아름다운 것들을 추구하는 타입입니다.",
      "논리적인 분석형":
        "체계적이고 분석적인 사고를 하는 성격이에요. 깊이 있는 학습과 탐구를 즐기는 타입입니다.",
      "친화적인 사회형":
        "타인을 돕고 사회적 가치를 추구하는 성격이에요. 공동체 활동과 봉사를 즐기는 타입입니다.",
      "모험적인 탐험형":
        "새로운 도전과 모험을 추구하는 성격이에요. 자유롭고 독립적인 여행을 선호하는 타입입니다.",
    };
    return descriptions[type] || "당신만의 특별한 성격을 가지고 있어요!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            관상 분석 결과
          </h1>
          <p className="text-gray-600">당신에게 맞는 활동을 추천해드려요!</p>
        </div>

        <div className="space-y-6">
          {/* 셀카와 성격 타입 */}
          <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
            <div className="relative">
              <img
                src={selfieUrl}
                alt="셀카"
                className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {getPersonalityEmoji(personalityType)}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {personalityType}
              </h2>
              <p className="text-gray-600 text-sm">
                {getPersonalityDescription(personalityType)}
              </p>
            </div>
          </div>

          {/* 추천 활동들 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🎯 당신에게 추천하는 활동
            </h3>
            <div className="grid gap-3">
              {recommendations.map((recommendation, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">
                      {recommendation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 추천 이유</h4>
            <p className="text-blue-700 text-sm">
              당신의 성격과 관상을 분석한 결과, 위의 활동들이 가장 잘 맞을 것
              같아요. 새로운 경험을 통해 더욱 즐거운 여행이 될 거예요!
            </p>
          </div>

          {/* 홈으로 돌아가기 버튼 */}
          <button
            onClick={handleBackToHome}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
          >
            🏠 홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
