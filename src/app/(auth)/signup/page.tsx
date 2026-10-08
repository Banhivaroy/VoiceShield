"use client";

import { useRouter } from "next/navigation";
import { SpaceLogin } from "@/components/ui/space-login";

export default function SignupPage() {
  const router = useRouter();

  const handleSignUp = async (data: { email: string; password: string; rememberMe: boolean }) => {
    const { email, password } = data;
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        router.push("/dashboard");
      } else {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to sign up");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#03060f]">
      <SpaceLogin 
        title="Sign Up" 
        subtitle="Sign up to get started" 
        onSubmit={handleSignUp} 
        onSignUp={() => router.push('/login')}
      />
    </div>
  );
}
