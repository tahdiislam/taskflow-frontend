/** @format */

"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImg from "@/public/authetication/login.svg";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useUserContext } from "@/contexts/userContext";
import italiana from "@/lib/italiana";

export default function Registration() {
  const [passError, setPassError] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();
  if (user?.user?.id) redirect("/profile");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passError) return;
    if (loading) return;
    setLoading(true);
    const form = event.target;
    const data = {
      username: form.username.value,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      password: form.password.value,
      confirm_password: form.confirm_password.value,
    };

    if (data.password !== data.confirm_password) {
      setPassError("Password does not match");
      return;
    }
    setPassError("");
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/user/register/`, data)
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Registration",
            description: res?.data?.success,
          });
          form.reset();
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

    // {
    //   "username": "random",
    //   "first_name": "hello",
    //   "last_name":"wordl",
    //   "email":"helloworld@th.com",
    //   "password":"134124sdrwerwqre@SS",
    //   "confirm_password":"134124sdrwerwqre@SS"
    //   }

    console.log("🚀 ~ handleSubmit ~ data:", data);
  };
  const handlePassChange = (event) => {
    const password = event.target.value;
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPassError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    setPassError("");
  };
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className={`text-3xl font-bold ${italiana.className}`}>
              Registration
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                type="text"
                placeholder="robinson32"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  type="text"
                  name="first_name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  type="text"
                  name="last_name"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                onChange={handlePassChange}
                name="password"
                id="password"
                type="password"
                placeholder="******"
                required
              />
              <small className="text-red-600">{passError}</small>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirm_password">Confirm Password</Label>
              </div>
              <Input
                name="confirm_password"
                id="confirm_password"
                type="password"
                placeholder="******"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300"
              disabled={loading}
            >
              <Loader2
                className={`${
                  !loading ? "hidden" : "block"
                } mr-2 h-4 w-4 animate-spin`}
              />
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
