import Image from "next/image";
import Spinner from "@/public/spinner.svg"

export default function Loading() {
  return (
    <section className="h-screen flex justify-center items-center">
      <Image src={Spinner} alt="Spinner" className="w-12 h-12" />
    </section>
  );
}