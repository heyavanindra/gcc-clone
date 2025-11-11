import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Collection } from '@/utils/schema'; // Adjust path as per your schema location

// Ensure mongoose connects only once
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(request, { params }) {
  try {
    const { category } = params;

    // Ensure you're using the correct model and schema
    const banner = await Collection.find().select('banner -_id');
    const categories = await Collection.find().select('mainTitle -_id');
    const uniqueCategories = categories.map(cat => cat.mainTitle);
    

    const product = await Collection.findOne({ mainTitle: category });

    if (product) {
      return NextResponse.json({ products: product.product, categories: uniqueCategories, img: banner[0] });
    } else {
      return NextResponse.json({ status: 404, categories: uniqueCategories });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  }
}

export async function POST(request,{params}) {
  const {category} = params;
  const data =  await request.json();

  try {

    const existingData = await Collection.findOne({mainTitle: category})
    if(existingData){
      existingData.product.push(data.product[0]);
      await existingData.save();
    }else{
      const newData = new Collection(data)
      await newData.save();
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong!', details: err.message });
  }
}

export async function PUT(request){
  const {banner} = await request.json();
  try{
    await Collection.updateMany({},{banner: banner});
    return NextResponse.json({ ok: true });
  }catch(err){
    return NextResponse.json({ error: 'Something went wrong!', details: err.message });
  }
}
