import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { CartItem } from '@/utils/schema';

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(){
    try{
        let sessionId = cookies().get('sessionId');
        const cartData = await CartItem.find({sessionId: sessionId.value});
        return NextResponse.json({cartData, ok: true})
    }catch(err){
        return NextResponse.json({error:'Something went wrong!'})
    }
}

export async function DELETE(){
  try{
      let sessionId = cookies().get('sessionId');
      await CartItem.deleteMany({sessionId: sessionId.value});
      return NextResponse.json({ok: true})
  }catch(err){
      return NextResponse.json({error:'Something went wrong!'})
  }
}

export async function POST(request, response) {
  try {
    // Parse incoming JSON payload
    const payload = await request.json();
    console.log(payload);

    // Checking if sessionId cookie exists, generat a new one if not
    let sessionId = cookies().get('sessionId');
    if (!sessionId) {
      sessionId = generateTimestampSessionId(); // Implemented session ID generation function

      // Seting cookie in the response
      cookies().set('sessionId', sessionId, {
        maxAge: 900000, // Cookie expiry time
        httpOnly: true,
        sameSite: 'strict', // Enforce same site policy for security
        path: '/' // Path to set the cookie (root path)
      });
    }

     // Checking if cart item exists with the same sessionId, id, and size
     const existingCartItem = await CartItem.findOne({
        sessionId : sessionId.value,
        id: payload.id,
        size: payload.size
      });
  
      if (existingCartItem) {
        // If item exists, update quantity and amount
        existingCartItem.quantity += payload.quantity;
        existingCartItem.amount += payload.amount;
        await existingCartItem.save();
        return NextResponse.json(existingCartItem);
      } else {
        // If item doesn't exist, create new cart item
        const cartData = new CartItem({
          ...payload,
          sessionId: sessionId.value
        });
  
        await cartData.save();
        return NextResponse.json(cartData);
      }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong!' });
  }
}

// Function to generate session ID
const generateTimestampSessionId = () => {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2, 15);
  return timestamp + randomString; // Unique session ID based on timestamp + random string
};
