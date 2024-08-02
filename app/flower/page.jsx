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
      <div className="grid grid-cols-4 gap-8">
        {flowers?.map((flower) => (
          // <div
          //   key={flower?.id}
          //   className="w-full flex flex-col justify-center items-center bg-slate-100 rounded-xl"
          // >
          //   <Image
          //     src={dummyImage}
          //     alt={flower?.title}
          //     width={250}
          //     className="rounded-xl w-full"
          //   />
          //   <h3 className="text-2xl font-semibold my-4">{flower?.title}</h3>

          //     <Link className="w-4/6" href={`/flower/${flower?.id}`}>
          //     <Button className="bg-emerald-500 hover:bg-emerald-600 uppercase">

          //     See Details
          //   </Button>
          //     </Link>
          // </div>
          <div
            key={flower?.id}
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
              <h1 className="text-lg font-semibold ">{flower?.title}</h1>
              <p className="text-sm text-gray-500 dark:text-white/60">
                {flower?.description?.slice(0, 80)}...
              </p>
              <div className="text-2xl font-semibold">৳{flower?.price}</div>
            </div>
            <div className="flex gap-4">
              <Link className="w-4/6" href={`/flower/${flower?.id}`}>
                <button className="text-base border-2 border-lime-800 py-2 px-4 rounded-md hover:bg-lime-800 hover:text-white transition ease-in-out duration-500 mt-4">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
