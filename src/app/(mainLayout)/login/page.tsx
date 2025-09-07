import { LoginForm } from "@/components/modules/auth/LoginForm";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="bg-muted flex min-h-[90vh] flex-col items-center justify-center gap-4 p-4 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 self-center text-lg font-medium"
        >
          Tech Sea
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
