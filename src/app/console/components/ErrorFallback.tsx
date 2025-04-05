import { FC } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ 
  error, 
  resetErrorBoundary 
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">
              Đã xảy ra lỗi
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {error.message}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-red-50 rounded p-4">
            <pre className="text-xs text-red-700 overflow-auto">
              {error.stack}
            </pre>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Tải lại trang
            </button>
            {resetErrorBoundary && (
              <button
                onClick={resetErrorBoundary}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
              >
                Thử lại
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;