/** @format */
"use client"

import { useRouter } from "next/navigation";

export default function Order() {
    const router = useRouter()
    router.push("/")
  return (
    <section >
        All Orders
    </section>
  );
}
