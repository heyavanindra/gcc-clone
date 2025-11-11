import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Blog } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(req){
    try{
        const blog = await Blog.find();
        return NextResponse.json(blog);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request){
    const payload = await request.json();
    try{
        const blog = new Blog(payload);
        await blog.save();
        return NextResponse.json({ok:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({status: 500})
    }
}

