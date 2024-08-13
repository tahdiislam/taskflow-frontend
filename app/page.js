import Events from "@/components/events"
import FlowersLimit from "@/components/flowerLimit"
import TopBanner from "@/components/topBanner"

export default function Home() {
  return (
    <section>
      <TopBanner/>
      <FlowersLimit/>
      <Events/>
    </section>
  )
}