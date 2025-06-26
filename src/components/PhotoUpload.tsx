import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeLocationImage, getCurrentLocation } from "../services/api";

const PhotoUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const imageUploadId = useId();

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
    try {
      const currnent = await getCurrentLocation();
      const result = await analyzeLocationImage(selectedImage,currnent.coords);
      setIsLoading(false);
      navigate("/location-info", {
        state: {
          imageUrl: previewUrl,
          locationName: result.title,
          description: result.overview,
        },
      });
    } catch (error) {
      setIsLoading(false);
      alert((error as Error).message);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">For in All</h1>
          <p className="text-sm text-gray-600">
            풍경 사진을 업로드하면 관광지 정보를 알려드려요!
          </p>
        </div>

        <div className="space-y-4">
          {/* 이미지 업로드 영역 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id={imageUploadId}
            />
            <label htmlFor={imageUploadId} className="cursor-pointer">
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="w-6 h-6 text-blue-500"
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
                  <p className="text-base font-medium text-gray-700">
                    사진을 선택하세요
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG 파일 지원</p>
                </div>
              </div>
            </label>
          </div>

          {/* 미리보기 */}
          {previewUrl && (
            <div className="space-y-3">
              <img
                src={previewUrl}
                alt="미리보기"
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="w-full bg-gradient-to-r text-white from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 py-3 px-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xl text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
