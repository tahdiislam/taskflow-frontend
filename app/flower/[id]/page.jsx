/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import dummyImage from "@/public/library.jpg";

export default async function Profile({ params }) {
  console.log("🚀 ~ Profile ~ params:", params);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/flower/list/${params?.id}`
  );
  const flower = await response.json();
  return (
    <div className="w-full p-4">
      <div className="w-10/12 grid grid-cols-2 gap-8 mx-auto">
        <Image
          src={dummyImage}
          alt={flower?.title}
          width={250}
          className="rounded-xl w-full h-auto"
        />
        <div className="flex flex-col justify-start gap-6">
          <h3 className="text-3xl font-medium">{flower?.title}</h3>
          <h3 className="text-xl font-medium bg-emerald-500 text-white px-7 py-1 rounded-full w-min shadow-inner shadow-emerald-800">{flower?.category}</h3>
          <h2 className="text-3xl font-semibold text-emerald-600">Price: ${flower?.price}</h2>
          <h2 className="text-3xl font-medium">Available: {flower?.available}</h2>
          <Button size='lg' className="w-5/6 bg-emerald-500 hover:bg-emerald-600 uppercase text-xl">
            Buy Now
          </Button>
        </div>
      </div>
      <p className="w-10/12 text-lg mx-auto py-8 text-justify">
        {flower?.description}
      </p>
    </div>
  );
}