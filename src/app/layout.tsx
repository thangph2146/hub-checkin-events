import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/providers/auth-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hệ thống Đăng ký và Điểm danh Sự kiện",
  description: "Hệ thống quản lý đăng ký và điểm danh cho sự kiện",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
            </div>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
