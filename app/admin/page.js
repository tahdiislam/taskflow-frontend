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

const TABS = {
  DETAILS: "DETAILS",
  ORDER_HISTORY: "ORDER_HISTORY",
};

export default function Admin() {
  const { user } = useUserContext();
  const [selectedTab, setSelectedTabs] = useState(
    localStorage.getItem("profile_tab") || TABS.DETAILS
  );
  const [orders, setOrders] = useState([]);
  if (!user?.user?.id) redirect("/login");
  if (!localStorage.getItem("admin")) redirect("/profile");
  // tab change handler
  const handleChangeTab = (tab) => {
    if (selectedTab !== tab && window !== "undefined") {
      setSelectedTabs((prev) => tab);
      window.localStorage.setItem("profile_tab", tab);
    }
  };
  const handleLoadOrders = () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/order/list/`)
      .then((res) => {
        if (res.status === 200) {
          setOrders((prev) => res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  useEffect(() => {
    if (orders?.length < 1) handleLoadOrders();
  }, [user?.id]);

  const handleChangeOrderStatus = async (id) => {
    await alert(
      "Do you want to change the order status 'Pending' to 'Completed'?"
    );
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/order/change-status/${id}`
      )
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        // if (res.status === 200 && window !== "undefined") {
        //   window.location.reload();
        // }
      })
      .catch((err) => {
        console.log(err);
      });
    if (window !== "undefined") {
      await window.location.reload();
    }
  };
  return (
    <div className="flex w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
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
                    {orders?.map((order) => (
                      <tr key={order?.id} className="border-2 border-lime-800">
                        <td className="py-2">{order?.id}</td>
                        <td>
                          {order?.status === "Pending" ? (
                            <Button
                              size="sm"
                              className="bg-red-600 text-white"
                              onClick={() => handleChangeOrderStatus(order?.id)}
                            >
                              {order?.status}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              disabled
                              className="disabled:bg-green-600 text-white"
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
                            href={`/flower/details/${order?.flower?.id}`}
                          >
                            {order?.flower?.title}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
