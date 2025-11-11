import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Counter } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const count = await Counter.find();
        return NextResponse.json(count);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request) {
    const payload = {
        title: 'HOLIDAY SEASON',
        count: new Date(),
        url: '/featured/sale'
    }
    try {
        const counter = new Counter(payload);
        await counter.save();
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ status: 500 });
    }
}

