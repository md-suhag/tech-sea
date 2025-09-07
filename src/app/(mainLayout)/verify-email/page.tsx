"use client";
import { config } from "@/config/env-config";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const verify = async () => {
    try {
      const response = await fetch(`${config.baseURL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Email verified successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error("verification failed");
    }
  };

  useEffect(() => {
    verify();
  }, [token]);

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className="flex items-center gap-2">
        <Loader size={30} className="animate-spin" /> Verifying your account...
      </div>
    </div>
  );
};

export default VerifyEmail;
