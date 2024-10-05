/** @format */
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import italiana from "@/lib/italiana";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#172b4d] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Login */}
        <div>
          <div className="flex items-center mb-4">
            {/* Add your logo image path */}
            <Image src={logo} alt="Logo" className="w-28 h-auto mr-2" />
          </div>
          <Link href="/login" className="text-sm hover:underline">
            Log In
          </Link>
        </div>

        {/* About TaskFlow */}
        <div>
          <h3 className="text-md font-semibold mb-2">About TaskFlow</h3>
          <p className="text-sm">What’s behind the boards.</p>
        </div>

        {/* Jobs */}
        <div>
          <h3 className="text-md font-semibold mb-2">Jobs</h3>
          <p className="text-sm">Learn about open roles on the TaskFlow team.</p>
        </div>

        {/* Apps */}
        <div>
          <h3 className="text-md font-semibold mb-2">Apps</h3>
          <p className="text-sm">
            Download the TaskFlow App for your Desktop or Mobile devices.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-md font-semibold mb-2">Contact us</h3>
          <p className="text-sm">
            Need anything? Get in touch and we can help.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#324563] mt-8 pt-4 flex flex-col md:flex-row justify-center items-center text-sm">
        {/* Links */}
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Copyright © 2024 TaskFlow
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
