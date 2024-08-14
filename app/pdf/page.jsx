/** @format */
"use client"
import { useRouter } from "next/navigation";

export default function PDF() {
    const router = useRouter()
    router.push("/")
  return (
    <section >
        All Orders pdf
    </section>
  );
}
