import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalityTest = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);

    // 실제 구현에서는 여기에 관상 분석 API 호출
    // 예시: await analyzePersonality(selectedImage);

    // 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      navigate("/recommendations", {
        state: {
          selfieUrl: previewUrl,
          personalityType: "활발한 외향형",
          recommendations: [
            "카페 투어",
            "스트리트 푸드 탐방",
            "야시장 체험",
            "로컬 마켓 방문",
          ],
        },
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">관상 분석</h1>
          <p className="text-gray-600 mb-4">
            그러면 너의 관상을 바탕으로 할 만한 걸 추천해줄게
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              💡 셀카를 찍어서 업로드해주세요!
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 셀카 업로드 영역 */}
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <label htmlFor="selfie-upload" className="cursor-pointer">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="w-8 h-8 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">셀카 찍기</p>
                  <p className="text-sm text-gray-500">
                    얼굴이 잘 보이도록 찍어주세요
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* 미리보기 */}
          {previewUrl && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="셀카 미리보기"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                  📸 셀카
                </div>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    관상 분석 중...
                  </div>
                ) : (
                  "관상 분석하기"
                )}
              </button>
            </div>
          )}

          {/* 분석 중 안내 */}
          {isLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 text-center">
                🔮 AI가 당신의 관상을 분석하고 있어요...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
