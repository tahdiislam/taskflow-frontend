/** @format */
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import italiana from "@/lib/italiana";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="h-auto bg-[#F1EFEB] p-3 md:p-6 pb-4 rounded-t-xl text-[#6A6E49] list-none text-sm md:text-base">
      <div className="grid grid-cols-4 pb-4">
        <div>
          <Image src={logo} alt="logo" width={100} height={100} />
        </div>
        <div>
          <h3 className={`text-xl md:text-2xl ${italiana.className}`}>Company</h3>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Contact us
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Career
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Culture
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Blog
            </Link>
          </li>
        </div>
        <div>
          <h3 className={`text-xl md:text-2xl ${italiana.className}`}>Support</h3>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Getting started
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Help center
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Server status
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Report a bug
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:no-underline transition duration-200 underline-offset-1"
              href="#"
            >
              Chat Support
            </Link>
          </li>
        </div>
        <div>
          <h3 className={`text-xl md:text-2xl ${italiana.className}`}>Social</h3>
          <ul className="text-xl md:text-3xl flex flex-col sm:flex-row justify-start items-center gap-4 transition-all duration-300">
            <li className="hover:text-lime-900">
              <FaFacebookSquare />
            </li>
            <li className="hover:text-lime-900">
              <FaInstagram />
            </li>
            <li className="hover:text-lime-900">
              <FaXTwitter />
            </li>
            <li className="hover:text-lime-900">
              <FaYoutube />
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div>
        <h5 className="text-sm text-center pt-4">
          Copyright ©️ Orchid Oasis All Rights Reserved
        </h5>
      </div>
    </footer>
  );
}
