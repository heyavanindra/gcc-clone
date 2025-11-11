import HeaderCarousal from "@/components/HeaderCarousal";
import OurCollections from "@/components/OurCollections";
import Banner from "@/components/Banner";
import Sales from "@/components/Sales";
import DualTiles from "@/components/DualTiles";
import ItemSale from "@/components/ItemSale";
import CounterSale from "@/components/CounterSale";
import Review from "@/components/Review";
import MissionnNews from "@/components/MissionnNews";
import BeforeAfter from "@/components/BeforeAfter";
import VideoSeenOn from "@/components/VideoSeenOn";
import FindStore from "@/components/FindStore";
import SubscribeModal from "@/components/SubscribeModal";

export default function Home() {
  return (
    <>
      <SubscribeModal />
      <HeaderCarousal />
      <OurCollections />
      <Banner />
      <Sales />
      <DualTiles />
      <ItemSale />
      <CounterSale />
      <Review />
      <BeforeAfter />
      {/* <VideoSeenOn /> */}
      <FindStore />
      <MissionnNews />
    </>
  );
}
