"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImg from "@/public/authetication/login.svg";
import register from "@/lib/register";

export default function Registration() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      password: form.password.value,
      confirm_password: form.confirm_password.value,
      username: form.username.value
    };

    const response = await register(data)
    console.log("🚀 ~ handleSubmit ~ response:", response)

    // {
    //   "username": "random",
    //   "first_name": "hello",
    //   "last_name":"wordl",
    //   "email":"helloworld@th.com",
    //   "password":"134124sdrwerwqre@SS",
    //   "confirm_password":"134124sdrwerwqre@SS"
    //   }

    console.log("🚀 ~ handleSubmit ~ data:", data)
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Registration</h1>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                type="text"
                placeholder="example"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required type='text' name='first_name' />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required type='text' name='last_name' />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input name='confirm_password' id="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              Registration
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={loginImg}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
