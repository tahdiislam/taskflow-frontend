/** @format */

import * as React from "react";
import FlowerBanner from "@/public/banner_flower.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-auto bg-emerald-500 p-6 pb-4 rounded-t-xl text-white list-none">
      <div className="grid grid-cols-4 pb-4">
        <div>
          <h2 className="text-3xl font-bold">Logo</h2>
        </div>
        <div>
          <h3 className="text-xl">Company</h3>
          <li>
            <Link href="#">About us</Link>
          </li>
          <li>
            <Link href="#">Contact us</Link>
          </li>
          <li>
            <Link href="#">Career</Link>
          </li>
          <li>
            <Link href="#">Culture</Link>
          </li>
          <li>
            <Link href="#">Blog</Link>
          </li>
        </div>
        <div>
          <h3 className="text-xl">Support</h3>
          <li>
            <Link href="#">Getting started</Link>
          </li>
          <li>
            <Link href="#">Help center</Link>
          </li>
          <li>
            <Link href="#">Server status</Link>
          </li>
          <li>
            <Link href="#">Report a bug</Link>
          </li>
          <li>
            <Link href="#">Chat Support</Link>
          </li>
        </div>
        <div>
          <h3 className="text-xl">Social</h3>
          Ⓜ️
        </div>
      </div>
      <hr />
      <div>
        <h5 className="text-sm text-center pt-4">Copyright ©️ Orchid Oasis All Rights Reserved</h5>
      </div>
    </footer>
  );
}
