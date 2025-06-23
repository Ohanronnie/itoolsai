"use client";

import { Twitter, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/app/lib/axios";
import { useRouter } from "next/navigation";
export default function ConnectX() {
  const [authUrl, setAuthUrl] = useState<string>();
  const router = useRouter();
  useEffect(
    function () {
      if (authUrl) window.location.href = authUrl;
    },
    [authUrl]
  );
  useEffect(function () {
    axiosInstance.get("/product/auth/twitter/user").then(({ data }) => {
      if (data?.name){
        router.replace("/content/setup")
      }
    });
  }, []);
  const handleClick = () => {
    axiosInstance
      .get("/product/auth/twitter/get_auth_url")
      .then(({ data }) => setAuthUrl(data.url))
      .catch(console.error);
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-10 text-center">
        <div className="flex justify-center mb-4">
          <Twitter className="h-10 w-10 text-base" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connect Your X Account
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We’ll post your scheduled content directly to X (Twitter)
        </p>

        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 bg-base hover:bg-base text-white font-medium py-3 rounded-xl transition"
        >
          <LogIn className="h-5 w-5" />
          Connect with X
        </button>

        <div className="mt-6 text-sm text-gray-500">
          You can disconnect at any time from your account settings
        </div>
      </div>
    </section>
  );
}
