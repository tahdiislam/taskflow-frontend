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
    <section className="h-[90vh]">
      <div className="flex justify-between items-center px-28">
        <div >
          <h1 className="text-6xl italic">
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
          />
        </div>
      </div>
    </section>
  );
}
