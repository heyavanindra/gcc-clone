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
  

  export async function PUT(request, { params }) {
    const itemId = params.id; // Item ID

    try {
        const { image, title, url } = await request.json();

        // Find and update the specific item within the collection
        const updatedCollection = await OurCollection.findOneAndUpdate(
            { "items._id": itemId },
            { 
                $set: {
                    "items.$.image": image,
                    "items.$.title": title,
                    "items.$.url": url
                }
            },
            { new: true, runValidators: true }
        );

        if (updatedCollection) {
            return NextResponse.json({ ok: true });
        } else {
            console.log('Item not found:', itemId);
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
    } catch (err) {
        console.log('Error:', err);
        return NextResponse.json({ status: 500, error: err.message });
    }
}