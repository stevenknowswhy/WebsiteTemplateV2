"use client";
import dynamic from "next/dynamic";

export default dynamic(() => import("./RevenueChart"), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse bg-gray-200 rounded-md" />
});