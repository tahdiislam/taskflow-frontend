/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import dummyImage from "@/public/flower_1.png";
import Link from "next/link";

export default async function Profile() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/flower/list`
  );
  const flowers = await response.json();
  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold p-4">All Flowers</h1>
      <div className="grid grid-cols-5 gap-8">
        {flowers?.map((flower) => (
          <div
            key={flower?.id}
            className="w-full flex flex-col justify-center items-center bg-slate-100 rounded-xl"
          >
            <Image
              src={dummyImage}
              alt={flower?.title}
              width={250}
              className="rounded-xl w-full"
            />
            <h3 className="text-2xl font-semibold my-4">{flower?.title}</h3>
            
              <Link className="w-4/6" href={`/flower/${flower?.id}`}>
              <Button className="bg-emerald-500 hover:bg-emerald-600 uppercase">

              See Details
            </Button>
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
