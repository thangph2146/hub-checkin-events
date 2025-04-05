import { auth } from "./auth";
import { redirect } from "next/navigation";

// Hàm kiểm tra người dùng đã đăng nhập hay chưa (chạy trên server)
export async function getSession() {
  const session = await auth();
  return session;
}

// Hàm kiểm tra người dùng đã đăng nhập hay chưa (chạy trên server)
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// Hàm bảo vệ route, yêu cầu đăng nhập
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  return session;
}

// Hàm chuyển hướng khi đã đăng nhập
export async function redirectIfAuthenticated() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
} 