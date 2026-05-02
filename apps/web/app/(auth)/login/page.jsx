"use client";

import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/store/auth.store";
import Link from "next/link";

export default function LoginPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/login", data);
      const res = await api.get("/auth/me");
      setUser(res.data.data);
      toast.success("Welcome back!");
      router.push("/workspaces");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-slate-100">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Link href="/forgot-password" size="sm" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
