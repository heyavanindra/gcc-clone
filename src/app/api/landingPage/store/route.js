import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Address } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const address = await Address.find();
        return NextResponse.json(address);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request){
    const payload =  [
        {
            storeName: 'FAE ULUWATU, BALI',
            address: 'Jl. Labuansait, Pecatu, Kec. Kuta Sel., Kabupaten Badung, Bali 80361, Indonesia',
            zipcode: 80361,
            openOn: 'Monday-Sunday: 9am-9pm',
            img: 'https://sahara-theme.myshopify.com/cdn/shop/files/IMG_6910_1024x1024_d8c6908b-f4c6-43b1-a325-ede8855b1be2.webp?v=1697010182&width=1440'
        },
        {
            storeName: 'FAE BYRON BAY, AUSTRALIA',
            address: '12/1 Porter St, Byron Bay, NSW, 2481, Australia',
            zipcode: 2481,
            openOn: '9am-4pm Mon-Fri, 10am-3pm Saturday',
            img: 'https://sahara-theme.myshopify.com/cdn/shop/files/104766089_962574754179485_2499654471741746808_n.jpg?v=1697010304&width=1440'
        },
    ];
    try{
        //const beforeAfter = new Address(payload);
        await Address.insertMany(payload);
        return NextResponse.json({ok:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({status: 500})
    }
}