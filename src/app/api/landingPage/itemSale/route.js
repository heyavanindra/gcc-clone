import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ItemSale } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const itemSale = await ItemSale.find();
        return NextResponse.json(itemSale);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request) {
    const payload = 
        {
            title: 'MEDITERRANEAN LOVE',
            image: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-307-min.jpg',
            url: '/collections/mediterranean_love'
            
        }
    try {
        const itemSale = new ItemSale(payload);
        await itemSale.save();
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ status: 500 });
    }
}

