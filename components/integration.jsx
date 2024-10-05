/** @format */
"use client";
import Image from "next/image";
import Slider from "react-infinite-logo-slider";
import logo1 from "@/public/integration/Acer-logo.png";
import logo2 from "@/public/integration/Adobe CC.svg";
import logo3 from "@/public/integration/Figma.svg";
import logo4 from "@/public/integration/Google Drive.svg";
import logo5 from "@/public/integration/Huawei-Logo.png";
import logo6 from "@/public/integration/logo-app-Twilio.svg";
import logo7 from "@/public/integration/Microsoft Outlook.svg";
import logo8 from "@/public/integration/Microsoft Teams.svg";
import logo9 from "@/public/integration/Microsoft.svg";
import logo10 from "@/public/integration/Nightfall.svg";
import logo11 from "@/public/integration/Okta.svg";
import logo12 from "@/public/integration/Pagerduty.svg";
import logo13 from "@/public/integration/Salesforce.svg";
import logo14 from "@/public/integration/Tableau.svg";
import logo15 from "@/public/integration/Vimeo.svg";
import logo16 from "@/public/integration/Zendesk.svg";

export default function Integration() {
  return (
    <section className="px-10 md:px-24 lg:px-32 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Connect Over 200+ Integrations
        </h1>
        <div className="flex flex-col gap-6 items-start">
          <p className="text-lg">
            Ensure your company`s data is completely secure and that you are in
            compliance with the latest standards
          </p>
          <button className="py-2 lg:py-3 px-6 md:px-7 lg:px-8 text-lg sm:text-xl md:text-2xl font-medium rounded-full border md:border-2 border-black">
            See All Integrations
          </button>
        </div>
      </div>
      <div className="mt-20">
        <Slider
          width="250px"
          duration={40}
          pauseOnHover={true}
          blurBorders={false}
          blurBoderColor={"#fff"}
        >
          {data?.map((item, index) => (
            <Slider.Slide key={index}>
              <div className="w-60 h-60 rounded-lg shadow-lg flex justify-center items-center bg-white">
                <Image src={item.image} alt="logo" className="w-40 h-auto" />
              </div>
            </Slider.Slide>
          ))}
        </Slider>
      </div>
    </section>
  );
}

const data = [
  {
    image: logo1,
  },
  {
    image: logo2,
  },
  {
    image: logo3,
  },
  {
    image: logo4,
  },
  {
    image: logo5,
  },
  {
    image: logo6,
  },
  {
    image: logo7,
  },
  {
    image: logo8,
  },
  {
    image: logo9,
  },
  {
    image: logo10,
  },
  {
    image: logo11,
  },
  {
    image: logo12,
  },
  {
    image: logo13,
  },
  {
    image: logo14,
  },
  {
    image: logo15,
  },
  {
    image: logo16,
  },
];
