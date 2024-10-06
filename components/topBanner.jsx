/** @format */

import * as React from "react";
import TaskBanner from "@/public/banner_img_2.png";
import Image from "next/image";
import Link from "next/link";

export default function TopBanner() {
  const words = ["with", "with"];
  const words2 = ["flowers", "gifts"];

  return (
    <section className="xl:h-[92vh] bg-[url('/banner_background.svg')] bg-no-repeat bg-cover bg-center">
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-10 md:px-20 relative z-10">
        <div className="py-10 md:py-12 lg:w-1/2">
          <h1 className={`text-4xl md:text-5xl text-white font-medium`}>
            <span>
              TaskFlow brings all your tasks, teammates, and tools together
            </span>
          </h1>
          <Link href="/registration">
            <button className="text-base py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition ease-in-out duration-500 mt-4">
              JOIN NOW
            </button>
          </Link>
        </div>
        <div>
          <Image
            src={TaskBanner}
            alt="Flower Banner"
            layout="responsive"
            width={1920}
            height={1080}
            className="w-full h-auto xl:h-[90vh]"
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
