"use client";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
const navItems = [
  { name: "Products", href: "/product" },
  { name: "Customers", href: "/customer" },
  { name: "Pricing", href: "/contact" },
  { name: "Contact", href: "/contact" },
];
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <header className="bg-white shadow md:shadow-0">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-semibold text-text-base">ItoolsAI</h1>
        <button
          className="text-2xl text-[#2a8e9e] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="hidden md:flex md:items-center md:gap-12">
          <nav>
            <ul className="flex text-sm space-x-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#142b3c] hover:text-[#2a8e9e] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/auth/login")}
              className="transition-colors duration-300 px-4 py-2 text-[#142b3c]  text-sm rounded-lg border border-slate-500 hover:bg-base hover:text-white"
            >
              Sign In
            </button>

            <button
              onClick={() => router.push("/auth/signup")}
              className="px-4 py-2 text-sm rounded-lg bg-[#2a8e9e] text-white hover:bg-white hover:text-text-base transition-colors duration-300 hover:border hover:border-slate-500 border border-[#2a8e9e]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out ",
          menuOpen
            ? "max-h-60 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95",
        )}
      >
        <nav className="flex flex-col  space-y-4 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[#142b3c] hover:text-[#2a8e9e] transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
