"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../lib/axios";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .post("/user")
      .then((req) => setIsAuthenticated(true))
      .catch((error) => router.push("/auth/login"));
      
  }, [router]);

  if (!isAuthenticated) {
    return null; // Optionally, show a loading spinner or placeholder
  }

  return <>{children}</>;
}
