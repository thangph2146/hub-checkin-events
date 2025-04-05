import type { Metadata } from "next";
import RegisterForm from "@/components/auth/register-form";
import { redirectIfAuthenticated } from "@/lib/auth-utils";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản",
  description: "Đăng ký tài khoản mới",
};

export default async function RegisterPage() {
  // Chuyển hướng nếu đã đăng nhập
  await redirectIfAuthenticated();
  
  return <RegisterForm />;
} 