/** @format */
"use client";
import Image from "next/image";
import profile from "@/public/without_background_img.png";
import { useUserContext } from "@/contexts/userContext";

export default function Profile() {
  const { user } = useUserContext();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-6 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <button className="text-start hover:underline">General</button>
            <button className="text-start hover:underline">Security</button>
            <button className="text-start hover:underline">Integrations</button>
            <button className="text-start hover:underline">Support</button>
          </nav>
          <div className="grid gap-6">
            <div className="flex items-start justify-start gap-12">
              <Image
                className="w-36 h-36 rounded-full border-2 border-emerald-500"
                src={profile}
                alt="Profile"
              />
              <div className="pt-4 flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-emerald-500">
                  {user?.user?.first_name} {user?.user?.last_name}
                </h1>
                <p className="text-xl font-medium">Username: {user?.user?.username}</p>
                <p className="text-xl font-medium">Email: {user?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
