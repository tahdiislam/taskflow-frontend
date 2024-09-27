/** @format */
"use client";
import Image from "next/image";
import payment from "@/public/payment.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Order({ params }) {
  const [order, setOrder] = useState(null);
  console.log("🚀 ~ Order ~ order:", order);

  const handleLoadOrder = () =>
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/order/list/${params.id}`
      )
      .then((res) => {
        setOrder((prev) => res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  useEffect(() => {
    if (!order) handleLoadOrder();
  }, [params?.id]);

  return (
    <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 p-4 xl:mt-10 xl:mb-20 mx-auto">
      <div className="bg-gray-200 rounded-3xl p-10 md:p-20">
        <div className="flex justify-center items-center gap-4">
          <div className="md:w-1/2">
            <h5 className="text-lg text-gray-600">Order Summary:</h5>
            <h1 className="text-3xl font-bold">Order #[{order?.id}]</h1>
            <h3 className="text-xl">{order?.flower?.title}</h3>
            <table className="w-10/12">
              <tbody className="text-gray-500 text-xl w-full text-start">
                <tr className="border-b border-gray-300">
                  <td className="font-medium">
                    <h3 className="py-2">Customer Id</h3>
                  </td>
                  <td>{order?.customer}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="font-medium">
                    <h3 className="py-2">Quantity</h3>
                  </td>
                  <td>{order?.quantity}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="font-medium">
                    <h3 className="py-2">Total Price</h3>
                  </td>
                  <td>
                    ৳
                    <span className="text-blue-700 font-bold">
                      {order?.total_price}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="font-medium">
                    <h3 className="py-2">Payment Status</h3>
                  </td>
                  <td>
                    {order?.payment_status ? (
                      <span className="text-blue-600 font-bold">Paid</span>
                    ) : (
                      <span className="text-red-600 font-bold">Unpaid</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="font-medium">
                    <h3 className="py-2">Order Status</h3>
                  </td>
                  <td>
                    {order?.status === "Pending" ? (
                      <span className="text-yellow-600 font-bold">Pending</span>
                    ) : order?.status === "Completed" ? (
                      <span className="text-blue-600 font-bold">Completed</span>
                    ) : (
                      <span className="text-red-600 font-bold">Canceled</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="font-medium">
                    <h3 className="py-2">Payment Method</h3>
                  </td>
                  <td className="text-blue-500 font-bold">SSLCOMMERZ</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="font-medium">
                    <h3 className="py-2">Order Date</h3>
                  </td>
                  <td>{new Date(order?.created_at).toLocaleDateString()}</td>
                </tr>
                {order?.payment_status === true && (
                  <tr className="border-b border-gray-300">
                    <td className="font-medium">
                      <h3 className="py-2">Transaction Id</h3>
                    </td>
                    <td>#{order?.transaction_id}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Image
            className="hidden md:block"
            src={payment}
            alt={order?.flower}
            width={250}
          />
        </div>
        <div className="flex justify-end">
          <Link
            className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-lg transition-all duration-200 active:scale-95"
            href={`/pdf/${order?.id}/`}
          >
            Download This Receipt
          </Link>
        </div>
      </div>
    </div>
  );
}
