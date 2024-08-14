/** @format */
import FlowerBanner from "@/public/banner_flower.png";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";
import flowers from "@/public/flowers.png";

export default function Events() {
  const words = ["with", "with"];
  const words2 = ["flowers", "gifts"];

  return (
    <section className="bg-[#E6E8D6] my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center">
        <div>
          <Image
            src={flowers}
            alt="Flower Banner"
            style={{
              width: "100%",
              height: "95vh",
            }}
            placeholder="blur"
          />
        </div>
        <div className="p-20">
          <h3 className="text-3xl italic mb-10">Weddings</h3>
          <p className="text-base italic">
            Our talented wedding team is dedicated to telling your unique story
            through extraordinary and memorable floral designs. From an
            understated wedding bouquet to a luxurious ballroom transformation,
            wedding flowers play a significant part in creating the atmosphere
            on the day. Whether you prefer simple, relaxed styles or dream of
            jaw-dropping floral installations, Fiore Flowers will make it a
            celebration to remember.
          </p>
        </div>
      </div>
    </section>
  );
}
