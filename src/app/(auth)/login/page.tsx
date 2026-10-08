"use client";

import { useRouter } from "next/navigation";
import { SpaceLogin } from "@/components/ui/space-login";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async (data: { email: string; password: string; rememberMe: boolean }) => {
    const { email, password } = data;
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        router.push("/dashboard");
      } else {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to sign in");
      }
    } catch (error) {
      console.error(error);
      throw error; // Let SpaceLogin handle the loading state properly or bubble up
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#03060f]">
      <SpaceLogin 
        title="Sign In" 
        subtitle="Sign in to continue" 
        onSubmit={handleSignIn} 
        onSignUp={() => router.push('/signup')}
      />
    </div>
  );
}
