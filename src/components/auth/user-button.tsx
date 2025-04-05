"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function UserButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Đăng nhập
        </Link>
        <Link
          href="/auth/register"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="w-8 h-8 overflow-hidden rounded-full bg-gray-200">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "Avatar"}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
        <span className="text-sm font-medium">{session.user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="p-3 border-b border-gray-200">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Trang cá nhân
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}