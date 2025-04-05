import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chào mừng đến với Hệ thống Đăng ký và Điểm danh Sự kiện
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nền tảng quản lý sự kiện, đăng ký và điểm danh thông minh dành cho 
            các tổ chức giáo dục và doanh nghiệp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Đăng ký Sự kiện</h2>
            <p className="text-gray-600 mb-4">
              Đăng ký tham gia các sự kiện học thuật, hội thảo, và các hoạt động 
              phong trào một cách nhanh chóng và dễ dàng.
            </p>
            <Link 
              href="/events" 
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Xem sự kiện →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Điểm danh thông minh</h2>
            <p className="text-gray-600 mb-4">
              Hỗ trợ điểm danh bằng nhiều phương thức: QR Code, Face ID, 
              và điểm danh thủ công cho các sự kiện trực tiếp và trực tuyến.
            </p>
            <Link 
              href="/about" 
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Tìm hiểu thêm →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Quản lý sự kiện</h2>
            <p className="text-gray-600 mb-4">
              Các công cụ quản lý sự kiện toàn diện, giúp tổ chức và theo dõi 
              các hoạt động từ lúc chuẩn bị đến khi kết thúc.
            </p>
            <Link 
              href="/console" 
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Vào trang quản lý →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
