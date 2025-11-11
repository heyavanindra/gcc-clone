import mongoose from "mongoose";
import { Lookbook } from "@/utils/Modal/LandingPageSchema";
import { NextResponse } from "next/server";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Connection to MongoDB failed:", err));
  }

  export async function GET(){
    try{
        const lookbook = await Lookbook.find();
        return NextResponse.json(lookbook);
    }catch(err){
        return NextResponse.json({message: err.message})
    }
}

export async function POST(request) {
    const payload = {
        banner: 'https://sahara-theme.myshopify.com/cdn/shop/files/orangeliggen.jpg',
        title: 'Discover Our lookbooks',
        desc: 'Lookbook Golden Ghaf',
        imageL: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_-44_3_-min.jpg',
        imageR: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-205_4_-min_1f50684c-94c7-46fd-9392-e714e4fd344a.jpg'
      };
      try{
        const lookBook = new Lookbook(payload);
        await lookBook.save();
        return NextResponse.json({ok: true});
      }
     catch (err) {
      console.error(err);
      return NextResponse.json({ message: 'failed to post data', details: err.message });
    }
  }