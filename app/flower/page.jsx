/** @format */
"use client";
import Image from "next/image";
import dummyImage from "@/public/flower_1.png";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Flowers() {
  const [flowers, setFlowers] = useState(null);
  const [page, setPage] = useState(1);
  const handleLoadFlowers = (pg) => {
    if (pg < 1 || pg > Math.ceil(parseFloat(flowers?.count / 8))) return;
    setPage((prev) => pg);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/flower/list/?page=${pg}`
      )
      .then((res) => {
        setFlowers((prev) => res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!flowers) handleLoadFlowers(1);
  });
  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold p-4">All Flowers</h1>
      <div className="grid grid-cols-4 gap-8">
        {flowers?.results?.map((flower) => (
          <div
            key={flower?.id}
            className="max-w-[350px] space-y-4 rounded-lg bg-white p-6 shadow-lg md:w-[350px] dark:bg-[#18181B]"
          >
            <picture className="rounded-lg overflow-hidden block">
              <Image
                width={200}
                height={200}
                className="h-[275px] w-[350px] rounded-lg object-cover hover:scale-110 ease-linear duration-200"
                src={dummyImage}
                alt={flower?.title}
              />
            </picture>
            <div className="grid gap-2">
              <h1 className="text-lg font-semibold ">
                {flower?.title?.length <= 30
                  ? flower?.title
                  : flower?.title?.slice(0, 30) + "..."}
              </h1>
              <p className="text-sm text-gray-500 dark:text-white/60">
                {flower?.description?.slice(0, 80)}...
              </p>
              <div className="text-2xl font-semibold">৳{flower?.price}</div>
            </div>
            <div className="flex gap-4">
              <Link className="w-4/6" href={`/flower/${flower?.id}`}>
                <button className="text-base border-2 border-lime-800 py-2 px-4 rounded-md hover:bg-lime-800 hover:text-white transition ease-in-out duration-500 mt-4">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination className="my-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={"cursor-pointer"}
              onClick={() => handleLoadFlowers(page - 1)}
            />
          </PaginationItem>
          {Array(Math.ceil(parseFloat(flowers?.count / 8)) || 1)
            ?.fill()
            ?.map((_, index) => index + 1)
            ?.map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  onClick={() => handleLoadFlowers(num)}
                  isActive={num === page}
                  className={"cursor-pointer"}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationNext
              className={"cursor-pointer"}
              onClick={() => handleLoadFlowers(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
