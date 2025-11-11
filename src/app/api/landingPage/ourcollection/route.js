import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { OurCollection } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(request){
    try{
        const collection = await OurCollection.find();
        return NextResponse.json(collection);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request){
    const payload = {
        mainTitle: 'Our Collections',
        items: [
            {
                image: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-834_2_-min.jpg',
                url: '/types/shop_all',
                title: 'Swimwear'
            },
            {
                image: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-437_4_-min.jpg',
                url: 'types/bikini_tops',
                title: 'Tops'
            },
            {
                image: 'https://sahara-theme.myshopify.com/cdn/shop/files/fae_-35.jpg',
                url: 'types/bikini_bottoms',
                title: 'Bottoms'
            }
        ]
    };
    try{
        const collection = new OurCollection(payload);
        await collection.save();
        return NextResponse.json({ok:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({status: 500})
    }
}