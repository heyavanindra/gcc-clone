import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { BeforeAfter } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const beforeAfter = await BeforeAfter.find();
        return NextResponse.json(beforeAfter);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request){
    const payload = {
        imageB: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAEStudioCrop-113_346e848b-5ba0-43d0-a71d-4b05690677dd.jpg',
        imageT: 'https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudioCrop-113.jpg',
        title: 'Our solid swimwear is produced using ECONYL®',
        desc: 'Using ECONYL® instead of sourcing new nylon allows us to recycle waste materials and give them a new life.'
    }
    try{
        const beforeAfter = new BeforeAfter(payload);
        await beforeAfter.save();
        return NextResponse.json({ok:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({status: 500})
    }
}