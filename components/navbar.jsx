/** @format */

"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUserContext } from "@/contexts/userContext";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useUserContext();
  const userToken = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  // logout handler
  const handleLogout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/customer/logout/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && typeof window !== "undefined") {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user_id");
          window.localStorage.removeItem("admin");
          setUser(null);
          console.log("successfully logout");
        }
      })
      .catch((err) => {
        console.log("logout error: ", err);
      });
  };
  return (
    <>
      <header className="top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/flower"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Flowers
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {/* <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form> */}
          <div className="ml-auto">
            {userToken ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full border-2 border-emerald-500 "
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {" "}
                    <Link
                      href={`${admin ? "/admin" : "/profile"}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {admin ? "Admin" : "Profile"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  <Link href="/registration">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
