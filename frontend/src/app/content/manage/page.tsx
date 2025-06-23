"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/lib/axios";
import { Twitter, PencilLine, Trash2, Clock } from "lucide-react";

export default function ManageXAccount() {
  const [connectedAccount, setConnectedAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const hasRun = useRef(false);

  const handleRemove = async () => {
    try {
      await axiosInstance.delete("/product/auth/twitter/remove");
      router.push("/content/setup"); // Redirect to setup after removal
    } catch (err) {
      alert("Failed to remove the account. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await axiosInstance.get("/product/auth/twitter/user");
        if (data?.name) {
          // Convert times to UTC
          const utcTimes = (data.times || []).map((time: string) => {
            const localTime = new Date(`1970-01-01T${time}:00`);
            return localTime.toISOString().split("T")[1].slice(0, 5); // Extract HH:mm in UTC
          });

          setConnectedAccount({
            username: data.username || data.name,
            displayName: data.name,
            avatar:
              data.avatar ||
              "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
            connectedAt: data.connectedAt || "Recently",
            postTimes: utcTimes, // Store UTC times
          });
        } else {
          router.push("/content/setup"); // Redirect if no account is connected
        }
      } catch (err) {
        router.push("/content/setup"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    if (!hasRun.current) {
      fetchAccount();
      hasRun.current = true;
    }
  }, [router]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
        <p className="text-gray-600">Loading...</p>
      </section>
    );
  }

  if (!connectedAccount) {
    return null; // Optionally, show a placeholder or redirect
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 sm:p-8 text-center border border-gray-200">
        <img
          src={connectedAccount.avatar}
          alt={connectedAccount.username}
          className="mx-auto w-14 h-14 rounded-full border border-base mb-4 shadow-sm"
        />

        <h3 className="text-lg font-semibold text-gray-800">
          {connectedAccount.displayName}
        </h3>
        <p className="text-gray-500">{connectedAccount.username}</p>
        <p className="text-xs text-gray-400 mt-1">
          Connected {connectedAccount.connectedAt}
        </p>

        <div className="mt-6 text-left">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Clock className="h-4 w-4 text-base" />
            Scheduled Post Times
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {connectedAccount.postTimes.length > 0 ? (
              connectedAccount.postTimes.map((time: string, index: number) => (
                <li key={index}>Everyday at {time} (UTC)</li>
              ))
            ) : (
              <li>No scheduled times</li>
            )}
          </ul>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => router.push("/content/setup")}
            className="flex items-center gap-1 px-4 py-2 text-sm rounded-xl bg-base text-white hover:opacity-90 transition"
          >
            <PencilLine className="h-4 w-4" />
            Edit
          </button>

          <button
            onClick={handleRemove}
            className="flex items-center gap-1 px-4 py-2 text-sm rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </section>
  );
}
