import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ReviewSection } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  };

  export async function GET(){
    try{
        const review = await ReviewSection.find();
        return NextResponse.json(review);
    }catch(err){
        return NextResponse.json({error: err});
    }
} ;

export async function POST(){
    try{
        const payload = [
            {
                title: 'Marie L',
                date : '05-05-2022',
                desc: "I recently purchased the pink bikini top from Kendall, and I absolutely love it! The top is made with high quality material and is designed to fit any body type.",
                image: 'https://sahara-theme.myshopify.com/cdn/shop/files/testimonials-2.jpg',
                name: 'Buy New Arrival',
                url: '/featured/new_arrivals'
            },
            {
                title: 'Amy R',
                date : '05-05-2022',
                desc: "This green bikini is great! I love the vibrant color and the fabric is very comfortable and light. The fit is perfect - it stays in place while I'm swimming and the straps are adjustable so I can get the right fit.",
                image: 'https://sahara-theme.myshopify.com/cdn/shop/files/testimonials-1.jpg',
                name: 'Buy Two Piece Bikini',
                url: '/types/two_piece_swimsuits'
            },
            {
                title: 'Julie S',
                date : '05-05-2022',
                desc: "The Espresso color is so beautiful and I get so many compliments when I wear it. It's also incredibly easy to put on and adjust for the perfect fit.",
                image: 'https://sahara-theme.myshopify.com/cdn/shop/files/testimonials-3.jpg',
                name: 'Buy Havana',
                url: '/collections/havana'
            }
        ];

        await ReviewSection.insertMany(payload);
        return NextResponse.json({ok: true});
    }catch(err){
        return NextResponse.json({error: err});
    }
} 







