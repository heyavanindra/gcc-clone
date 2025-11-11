import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CartItem } from '@/utils/schema';

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }


  export async function PUT(request, {params}) {

    const {id} = params;
    let sessionId = cookies().get('sessionId');
    const { size, newQuantity } = await request.json();
  
    if (!id || !size || !newQuantity || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
  
    try {

      const cartItem = await CartItem.findOne({ _id: id, size, sessionId: sessionId.value });
  
      if (!cartItem) {
        return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
      }
  
      cartItem.quantity = newQuantity;
      cartItem.amount = newQuantity * cartItem.unitPrice;
  
      await cartItem.save();
  
      return NextResponse.json({ message: 'Cart item updated successfully', cartItem });
    } catch (error) {
      console.error('Error updating cart item:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

export async function DELETE(request,{params}){
    try{
        const {id} = params;
        console.log(id);
        await CartItem.deleteOne({_id: id})
        return NextResponse.json({ok:true})
    }catch(err){
        console.error(err)
    }
}