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
  

  export async function PUT(request, { params }) {
    const id = params.id; 

    try {
        const { image, title, desc, url } = await request.json();

        // Find and update the specific item within the collection
        const updatedItem = await DualTile.findOneAndUpdate(
            { _id: id },
            { 
                $set: {
                    image,
                    title,
                    desc,
                    url
                }
            },
            { new: true, runValidators: true }
        );

        if (updatedItem) {
            return NextResponse.json({ ok: true });
        } else {
            console.log('Item not found:', id);
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
    } catch (err) {
        console.log('Error:', err);
        return NextResponse.json({ status: 500, error: err.message });
    }
}