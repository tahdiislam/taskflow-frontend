/** @format */

import Categories from "@/components/categories";
import Events from "@/components/events";
import FlowersLimit from "@/components/flowerLimit";
import TopBanner from "@/components/topBanner";

export default function Home() {
  return (
    <section>
      <TopBanner />
      <FlowersLimit />
      <Categories />
      <Events />
    </section>
  );
}
