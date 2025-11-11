import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Order, Payment } from '@/utils/schema';

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

  export async function GET(request){
    try{
      const populatedOrder = await Order.find().populate('products').exec();
      return NextResponse.json(populatedOrder)
    }catch(err){
      return NextResponse.json({err})
    }
  }

  export async function POST(request) {
    const payload = await request.json();
    console.log(payload.products);
    
  
    try {
      const { products, ...orderData } = payload;

      const order = new Order({
        ...orderData,
        products: products
    });

    await order.save();
  
    return NextResponse.json({ order, ok: true });
} catch (err) {
    console.error('Error creating order:', err);
    return NextResponse.json({ ok: false, error: err.message });
}
}

 