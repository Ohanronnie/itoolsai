"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TrialPopup({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-base text-white rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-md shadow-xl animate-in slide-in-from-bottom duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          🎉 Try the Starter Plan Free for 7 Days
        </h2>
        <p className="text-sm  text-white/90 mb-6">
          No credit card needed. Experience full access to automation tools
          instantly.
        </p>
        <button onClick={() => router.push("/auth/signup")} className="w-full bg-white text-base font-medium text-base py-3 rounded-xl hover:bg-gray-100 transition">
          Start Free Trial
        </button>
      </div>
    </div>
  );
}
