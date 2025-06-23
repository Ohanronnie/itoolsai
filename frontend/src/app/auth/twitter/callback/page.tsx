"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/app/lib/axios";

const TwitterCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const authenticateUser = async () => {
      console.log(window.location.href);
      const oauth_token = searchParams.get("oauth_token");
      const oauth_verifier = searchParams.get("oauth_verifier");

      if (!oauth_token || !oauth_verifier) {
        setError("Invalid or missing authentication details.");
        setLoading(false);
        return;
      }

      try {
        // Send code to backend
        const response = await axiosInstance.post(
          "/product/auth/twitter/callback",
          {
            oauth_token,
            oauth_verifier,
          }
        );
        setUser(response.data); // Store user data
        router.replace("/content/setup"); // Redirect after success
      } catch (err: any) {
        setError(err.response?.data || "Authentication failed.");
      } finally {
        setLoading(false);
      }
    };

    if (hasRun.current) return;

    authenticateUser();
    hasRun.current = true;
  }, [searchParams, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
    </div>
  );
};

export default TwitterCallback;
