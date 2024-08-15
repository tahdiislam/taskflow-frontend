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
          <h1 className={`text-3xl font-semibold ${italiana.className}`}>
            Profile
          </h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <button
              onClick={() => handleChangeTab(TABS.DETAILS)}
              className={`text-start hover:underline ps-3 py-3 rounded-r-full ${
                selectedTab === TABS.DETAILS ? "bg-lime-600 text-white" : ""
              }`}
            >
              Details
            </button>
            <button
              onClick={() => handleChangeTab(TABS.ORDER_HISTORY)}
              className={`text-start hover:underline ps-3 py-3 rounded-r-full ${
                selectedTab === TABS.ORDER_HISTORY
                  ? "bg-lime-600 text-white"
                  : ""
              }`}
            >
              Order History
            </button>
          </nav>
          <div className="grid gap-6">
            {selectedTab === TABS.DETAILS ? (
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-12">
                <Image
                  className="w-36 h-36 rounded-full border-2 border-lime-600"
                  src={profile}
                  alt="Profile"
                />
                <div className="pt-4 flex flex-col gap-2">
                  <h1
                    className={`text-3xl font-semibold text-lime-600 ${italiana.className}`}
                  >
                    {user?.user?.first_name} {user?.user?.last_name}
                  </h1>
                  <p className="text-xl font-medium">
                    Username: {user?.user?.username}
                  </p>
                  <p className="text-xl font-medium">
                    Email: {user?.user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <section>
                <h1 className={`text-3xl font-bold py-4 ${italiana.className}`}>
                  Order History
                </h1>
                <Table className="text-center table-fixed md:table-auto">
                  <TableCaption>A list of your recent orders</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Id</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-center">Total Price</TableHead>
                      <TableHead className="text-center">Created at</TableHead>
                      <TableHead className="text-center">Flower</TableHead>
                      <TableHead className="text-center">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders?.results?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order?.id}</TableCell>
                        <TableCell>{order?.status}</TableCell>
                        <TableCell>{order?.quantity}</TableCell>
                        <TableCell>{order?.total_price}</TableCell>
                        <TableCell>
                          {formattedDate(order?.created_at)}
                        </TableCell>
                        <TableCell>
                          <Link
                            className="text-lime-600 hover:text-lime-500 hover:underline"
                            href={`/flower/${order?.flower?.id}`}
                          >
                            {order?.flower?.title.slice(0, 20)}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            className="text-yellow-500 hover:text-yellow-600 hover:underline"
                            href={`/order/${order?.id}`}
                          >
                            See more
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination className="my-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={"cursor-pointer"}
                        onClick={() => handleLoadOrders(page - 1)}
                      />
                    </PaginationItem>
                    {Array(Math.ceil(parseFloat(orders?.count / 8)) || 1)
                      ?.fill()
                      ?.map((_, index) => index + 1)
                      ?.map((num) => (
                        <PaginationItem key={num}>
                          <PaginationLink
                            onClick={() => handleLoadOrders(num)}
                            isActive={page === num}
                            className={"cursor-pointer"}
                          >
                            {num}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    <PaginationItem>
                      <PaginationNext
                        className={"cursor-pointer"}
                        onClick={() => handleLoadOrders(page + 1)}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
