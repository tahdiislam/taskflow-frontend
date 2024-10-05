/** @format */
"use client";
import Image from "next/image";
import profile from "@/public/without_background_img.png";
import { useUserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import italiana from "@/lib/italiana";
import Spinner from "@/public/spinner.svg";

const TABS = {
  DETAILS: "DETAILS",
  ORDER_HISTORY: "ORDER_HISTORY",
};

export default function Profile({ params }) {
  const { user } = useUserContext();
  const [selectedTab, setSelectedTabs] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("profile_tab")) ||
      TABS.ORDER_HISTORY
  );
  const [orders, setOrders] = useState({});
  const [page, setPage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("user_id");
      if (!userId) router.push("/login");
    }
  }, [router]);
  // tab change handler
  const handleChangeTab = (tab) => {
    if (selectedTab !== tab && typeof window !== "undefined") {
      setSelectedTabs((prev) => tab);
      window.localStorage.setItem("profile_tab", tab);
    }
  };
  const handleLoadOrders = (pg = 1) => {
    if (!user?.id) return;
    if (pg < 1 || pg > Math.ceil(parseFloat(orders?.count / 8))) return;
    setPage((prev) => pg);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/order/list/?customer_id=${user?.id}&page=${pg}`
      )
      .then((res) => {
        if (res.status === 200) {
          setOrders((prev) => res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!orders?.count) handleLoadOrders();
  });

  const formattedDate = (isoDateString) =>
    format(new Date(isoDateString), "MMMM dd, yyyy HH:mm:ss a");
  return (
    <div className="flex w-full flex-col">
      <main className="flex min-h-[calc(70vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <Image
              className="w-36 h-36 rounded-full border-2 border-blue-600"
              src={profile}
              alt="Profile"
            />
            <div className="pt-4 flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-blue-600">
                {user?.user?.first_name} {user?.user?.last_name}
              </h1>
              <p className="text-xl font-medium">
                Username: {user?.user?.username}
              </p>
              <p className="text-xl font-medium">Email: {user?.user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
