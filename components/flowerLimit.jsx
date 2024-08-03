/** @format */
"use client";
import Image from "next/image";
import dummyImage from "@/public/flower_1.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
// import Swiffy Slider JS
import { swiffyslider } from "swiffy-slider";

// import Swiffy Slider CSS
import "swiffy-slider/css";

if (typeof window !== "undefined") {
    window.swiffyslider = swiffyslider;

    window.addEventListener("load", () => {
      window.swiffyslider.init();
    });
}

export default function FlowersLimit() {
  const [flowers, setFlowers] = useState(null);
  
  const handleLoadFlowers = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/flower/list/?limit=7`)
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
      <div class="swiffy-slider slider-item-show4 slider-item-show2-sm slider-nav-round slider-nav-scrollbar slider-nav-animation">
        <ul class="slider-container">
          {flowers?.results?.map((flower) => (
            <li key={flower?.id}>
              <div
                id={`slide${flower?.id}`}
                className="max-w-[350px] space-y-4 rounded-lg bg-white p-6 shadow-lg md:w-[350px] dark:bg-[#18181B]"
              >
                <Image
                  width={200}
                  height={200}
                  className="h-[275px] w-[350px] rounded-lg object-cover"
                  src={dummyImage}
                  alt={flower?.title}
                />
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
            </li>
          ))}
        </ul>

        <button type="button" class="slider-nav"></button>
        <button type="button" class="slider-nav slider-nav-next"></button>

        <ul class="slider-indicators">
          <li class=""></li>
          <li class=""></li>
          <li class=""></li>
          <li class=""></li>
          <li class=""></li>
          <li class=""></li>
          <li class=""></li>
          <li class=""></li>
          <li class="active"></li>
        </ul>
      </div>
    </div>
  );
}
