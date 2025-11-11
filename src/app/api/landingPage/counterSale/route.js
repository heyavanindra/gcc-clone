import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { CounterSale } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const count = await CounterSale.find();
        return NextResponse.json(count);
    }catch(err){
        return NextResponse.json(err);
    }
} 

export async function POST(request) {
    const payload = [
        {
            title: 'SAHARA BALI, SWIMWEAR COLLECTION',
            image: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-116.jpg',
            url: '/collections/bali_dreams'
        },
        {
            title: 'DISCOVER SAHARA, SWIMWEAR',
            image: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-743.jpg',
            url: '/types/shop_all'
        }
    ]
    try {
        
        await CounterSale.insertMany(payload);
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ status: 500 });
    }
}

