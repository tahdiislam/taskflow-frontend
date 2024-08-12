/** @format */
"use client";
import { quantum } from 'ldrs'
quantum.register()

export default function Loading() {
  return (
    <section className="h-screen flex justify-center items-center">
      <l-quantum size="50" speed="1.75" color="#3F6212"></l-quantum>
    </section>
  );
}