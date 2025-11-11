import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { DualTile } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const banner = await DualTile.find();
        return NextResponse.json(banner);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request) {
    const payload = [
        {
            title: 'HIGHEST QUALITY, LOVE FOREVER',
            image: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-174-min.jpg',
            desc: "Sahara's Swimwear Makes, You Look And Feel, Confident And Sexy",
            url: "/featured/new_arrivals"
        },
        {
            title: 'SAHARAS STORY',
            image: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-855-min.jpg',
            desc: 'Our Swimwear Is Crafted With Eco-Friendly Materials, Ensuring A Sustainable Future',
            url: "/collections/shop_all"
        }
    ];
    try {
        await DualTile.insertMany(payload);
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ status: 500 });
    }
}

