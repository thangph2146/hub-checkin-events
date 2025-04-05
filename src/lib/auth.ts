import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcrypt";

// Mở rộng interface Session cho NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"] || "",
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Đăng nhập",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập email và mật khẩu");
        }

        const nguoiDung = await prisma.nguoiDung.findUnique({
          where: { email: credentials.email as string },
        });

        if (!nguoiDung || !nguoiDung.matKhauLocal) {
          throw new Error("Email chưa được đăng ký");
        }

        if (nguoiDung.status !== 1) {
          throw new Error("Tài khoản đã bị khóa");
        }

        const isValidPassword = await compare(
          credentials.password as string,
          nguoiDung.matKhauLocal || ""
        );

        if (!isValidPassword) {
          throw new Error("Mật khẩu không chính xác");
        }

        // Cập nhật thời gian đăng nhập
        await prisma.nguoiDung.update({
          where: { nguoiDungId: nguoiDung.nguoiDungId },
          data: { lastLogin: new Date() },
        });

        return {
          id: nguoiDung.nguoiDungId.toString(),
          name: nguoiDung.fullName || "",
          email: nguoiDung.email || "",
          image: ""
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token["id"] = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token["id"] as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Xử lý đặc biệt cho Google login
      if (account?.provider === "google" && profile) {
        try {
          const email = profile.email as string;
          const sub = profile.sub as string;
          const name = profile.name as string;

          // Kiểm tra người dùng đã tồn tại với email này chưa
          const existingUser = await prisma.nguoiDung.findUnique({
            where: { email },
          });

          if (existingUser) {
            // Nếu tài khoản đã tồn tại nhưng chưa có accountId Google
            if (!existingUser.accountId) {
              await prisma.nguoiDung.update({
                where: { nguoiDungId: existingUser.nguoiDungId },
                data: {
                  accountId: sub,
                  accountType: "google",
                  lastLogin: new Date(),
                },
              });
            } else {
              // Cập nhật thời gian đăng nhập
              await prisma.nguoiDung.update({
                where: { nguoiDungId: existingUser.nguoiDungId },
                data: { lastLogin: new Date() },
              });
            }
          } else {
            // Tạo người dùng mới từ Google
            await prisma.nguoiDung.create({
              data: {
                email,
                fullName: name,
                accountId: sub,
                accountType: "google",
                status: 1,
                createdAt: new Date(),
              },
            });
          }
        } catch (error) {
          console.error("Lỗi xử lý đăng nhập Google:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Để tương thích với API route cũ
export const authOptions = authConfig; 