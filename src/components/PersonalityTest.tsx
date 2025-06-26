import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentLocation, getRecommendations } from "../services/api";

const PersonalityTest = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const selfieUploadId = useId();

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
    try {
      const currnent = await getCurrentLocation();
      const result = await getRecommendations(selectedImage, currnent.coords);
      setIsLoading(false);
      navigate("/recommendations", {
        state: {
          selfieUrl: URL.createObjectURL(selectedImage),
          personalityType: result.travel_type,
          recommendations: result.contents,
        },
      });
    } catch (error) {
      setIsLoading(false);
      alert((error as Error).message);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">관상 분석</h1>
          <p className="text-sm text-gray-600 mb-3">
            그러면 너의 관상을 바탕으로 할 만한 걸 추천해줄게
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              💡 셀카를 찍어서 업로드해주세요!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* 셀카 업로드 영역 */}
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id={selfieUploadId}
            />
            <label htmlFor={selfieUploadId} className="cursor-pointer">
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="w-6 h-6 text-purple-500"
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
                  <p className="text-base font-medium text-gray-700">
                    셀카 찍기
                  </p>
                  <p className="text-xs text-gray-500">
                    얼굴이 잘 보이도록 찍어주세요
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* 미리보기 */}
          {previewUrl && (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="셀카 미리보기"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                  📸 셀카
                </div>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-700 hover:to-purple-700 w-full py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg text-sm"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800 text-center">
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
