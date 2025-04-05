import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";
import { redirectIfAuthenticated } from "@/lib/auth-utils";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào hệ thống",
};

export default async function LoginPage() {
  // Chuyển hướng nếu đã đăng nhập
  await redirectIfAuthenticated();
  
  return <LoginForm />;
} 