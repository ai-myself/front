import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PhotoUpload = () => {
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

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsLoading(true);

    // 실제 구현에서는 여기에 이미지 업로드 API 호출
    // 예시: await uploadImage(selectedImage);

    // 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      navigate("/location-info", {
        state: {
          imageUrl: previewUrl,
          locationName: "예시 관광지",
          description: "이곳은 아름다운 풍경을 자랑하는 관광지입니다.",
        },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            여행 AI 어시스턴트
          </h1>
          <p className="text-gray-600">
            풍경 사진을 업로드하면 관광지 정보를 알려드려요!
          </p>
        </div>

        <div className="space-y-6">
          {/* 이미지 업로드 영역 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    사진을 선택하거나 드래그하세요
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG 파일을 지원합니다
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* 미리보기 */}
          {previewUrl && (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="미리보기"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    분석 중...
                  </div>
                ) : (
                  "관광지 정보 확인하기"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
