import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Banner } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const banner = await Banner.find();
        return NextResponse.json(banner);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request){
    const payload = {
        image: 'https://sahara-theme.myshopify.com/cdn/shop/files/sahara-home-full-width-banner.jpg',
        title: 'LUXURY SWIMWEAR CREATED WITH CARE',
        title2: 'SPRING/SUMMER 2024',
        url: '/featured/new_arrivals',
        url2: '/featured/shop_all'
    };
    try{
        const collection = new Banner(payload);
        await collection.save();
        return NextResponse.json({ok:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({status: 500})
    }
}