"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocketStore } from "../store/socket.store";
import { useAuthStore } from "../store/auth.store";
import Navbar from "@/components/navbar";


export default function DashboardLayout({ children }) {
  const { user, fetchUser, loading } = useAuthStore();
  const router = useRouter();
  const connect = useSocketStore((s) => s.connect);
  const joinUser = useSocketStore((s) => s.joinUser);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (user) {
      connect();
      joinUser(user.id);
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return <div> <Navbar></Navbar> {children}</div>;
}