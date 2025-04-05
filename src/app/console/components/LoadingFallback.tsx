import { FC } from 'react';

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: FC<LoadingFallbackProps> = ({ 
  message = 'Đang tải dữ liệu...' 
}) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4 bg-gray-50/30 rounded-lg">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
        <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-r-2 border-indigo-400 animation-delay-150"></div>
      </div>
      <div className="text-center">
        <p className="text-gray-600 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-1">Vui lòng đợi trong giây lát</p>
      </div>
    </div>
  );
};

export default LoadingFallback;