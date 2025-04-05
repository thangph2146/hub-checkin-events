import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    // Kiểm tra các trường bắt buộc
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      );
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 400 }
      );
    }

    // Hash mật khẩu
    const hashedPassword = await hash(password, 10);

    // Tạo người dùng mới
    const newUser = await prisma.nguoiDung.create({
      data: {
        email,
        fullName,
        matKhauLocal: hashedPassword,
        accountType: "local",
        status: 1,
        createdAt: new Date(),
      },
    });

    // Loại bỏ mật khẩu trước khi trả về
    const { matKhauLocal, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: "Đăng ký thành công",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi đăng ký tài khoản" },
      { status: 500 }
    );
  }
}