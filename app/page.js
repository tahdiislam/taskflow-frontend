/** @format */

import Categories from "@/components/categories";
import Events from "@/components/events";
import TopBanner from "@/components/topBanner";

export default function Home() {
  return (
    <section>
      <TopBanner />
      <Categories />
      <Events />
    </section>
  );
}
