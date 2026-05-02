"use client";

import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await api.post("/user/register", data);
      toast.success("Account created! Please login.");
      router.push("/login");
    } catch (err) {
      toast.error("Registration failed. Try a different email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-green-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-slate-100">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500">Join us to get started with your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md shadow-green-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-green-600 hover:underline transition-all">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
