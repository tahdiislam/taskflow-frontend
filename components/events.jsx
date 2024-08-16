/** @format */
"use client";
import Image from "next/image";
import flowers from "@/public/flowers.png";
import italiana from "@/lib/italiana";
import { motion } from "framer-motion";

export default function Events() {
  return (
    <section className="bg-[#E6E8D6] my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center">
        <motion.picture
          initial={{ scale: 0.7, opacity: 0, x: -50, y: 50 }}
          whileInView={{ scale: 1, opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src={flowers}
            alt="Flower Banner"
            style={{
              width: "100%",
              height: "95vh",
            }}
            placeholder="blur"
          />
        </motion.picture>
        <div className="p-20">
          <h3 className={`text-3xl italic mb-10 ${italiana.className}`}>
            Weddings
          </h3>
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
