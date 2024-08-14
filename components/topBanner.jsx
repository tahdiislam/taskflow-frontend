/** @format */

import * as React from "react";
import FlowerBanner from "@/public/banner_flower.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";

export default function TopBanner() {
  const words = ["with", "with"];
  const words2 = ["flowers", "gifts"];

  return (
    <section className="lg:h-[90vh]">
      <div className=" flex flex-col lg:flex-row justify-between items-center px-4 sm:px-10 md:px-20 lg:px-28">
        <div className="py-10 md:py-12">
          <h1 className="text-4xl md:text-5xl xl:text-6xl italic">
            <span>We tell stories</span>
            <br />
            <FlipWords words={words} />
            <FlipWords words={words2} />
          </h1>
          <Link href="/flower" ><button className="text-base border-2 border-lime-800 py-3 px-6 rounded-xl hover:bg-lime-800 hover:text-white transition ease-in-out duration-500 mt-4">SHOP NOW</button></Link>
        </div>
        <div>
          <Image
            src={FlowerBanner}
            alt="Flower Banner"
            style={{
              width: "100%",
              height: "90vh",
            }}
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
