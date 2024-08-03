/** @format */
"use client";
import Image from "next/image";
import profile from "@/public/without_background_img.png";
import { useUserContext } from "@/contexts/userContext";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const TABS = {
  DETAILS: "DETAILS",
  ORDER_HISTORY: "ORDER_HISTORY",
};

export default function Admin() {
  const { user } = useUserContext();
  const [selectedTab, setSelectedTabs] = useState(
    localStorage.getItem("profile_tab") || TABS.ORDER_HISTORY
  );
  const [orders, setOrders] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const { toast } = useToast();
  if (!user?.user?.id) redirect("/login");
  if (!localStorage.getItem("admin")) redirect("/profile");
  // tab change handler
  const handleChangeTab = (tab) => {
    if (selectedTab !== tab && window !== "undefined") {
      setSelectedTabs((prev) => tab);
      window.localStorage.setItem("profile_tab", tab);
    }
  };
  const handleLoadOrders = (pg = 1) => {
    if (!user?.id) return;
    if (pg < 1 || pg > Math.ceil(parseFloat(orders?.count / 8))) return;
    setPage((prev) => pg);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/order/list/?page=${pg}`)
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
  }, [user?.id]);

  const handleChangeOrderStatus = async (id) => {
    setLoading((prev) => true);
    setId((prev) => id);
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/order/status/${id}`,
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoading((prev) => false);
        setId((prev) => null);
        if (res.status === 200) {
          toast({
            title: "Status has been Changed",
          });
          handleLoadOrders();
        }
      })
      .catch((err) => {
        setLoading((prev) => false);
        setId((prev) => null);
        console.log(err);
      });
  };
  return (
    <div className="flex w-full flex-col">
      <main className="flex min-h-[calc(70vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
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
              <div className="flex items-start justify-start gap-12">
                <Image
                  className="w-36 h-36 rounded-full border-2 border-lime-800"
                  src={profile}
                  alt="Profile"
                />
                <div className="pt-4 flex flex-col gap-2">
                  <h1 className="text-2xl font-semibold text-lime-800">
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
                <h1 className="text-3xl font-bold py-4">Order History</h1>
                <table width="1000">
                  <thead>
                    <tr className="border-2 border-lime-800">
                      <th className="py-2">Id</th>
                      <th>Status</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Created Date</th>
                      <th>Flower</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {orders?.results?.map((order) => (
                      <tr key={order?.id} className="border-2 border-lime-800">
                        <td className="py-3">{order?.id}</td>
                        <td>
                          {order?.status === "Pending" ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                {loading && order?.id === id ? (
                                  <Button
                                    className="bg-lime-600"
                                    disabled
                                    size="sm"
                                  >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                                    Please wait
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="bg-red-600 text-white"
                                  >
                                    {order?.status}
                                  </Button>
                                )}
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleChangeOrderStatus(order?.id)
                                    }
                                    className="bg-green-500 hover:bg-green-600"
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-lime-700 hover:bg-lime-700 text-white cursor-no-drop"
                            >
                              {order?.status}
                            </Button>
                          )}
                        </td>
                        <td>{order?.quantity}</td>
                        <td>{order?.total_price}</td>
                        <td>{order?.created_at}</td>
                        <td>
                          <Link
                            className="text-lime-800 hover:text-lime-800 hover:underline"
                            href={`/flower/${order?.flower?.id}`}
                          >
                            {order?.flower?.title}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
