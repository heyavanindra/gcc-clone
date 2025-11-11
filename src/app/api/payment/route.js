import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Payment } from '@/utils/schema';

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(request) {
  try {
    // Get the sessionId from cookies
    let sessionId = cookies().get('sessionId').value;

    // Find all payments with the matching sessionId
    const payments = await Payment.find({ sessionId });

    return NextResponse.json(payments);
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function DELETE(request) {
  try {
    // Get the sessionId from cookies
    let sessionId = cookies().get('sessionId').value;

    // Delete all payments with the matching sessionId
    await Payment.deleteMany({ sessionId });

    return NextResponse.json({ok: true});
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}


export async function POST(request, response) {
  try {
    const payload = await request.json();
    //console.log(payload);

    // Validate payload structure
    if (!Array.isArray(payload) || payload.length === 0) {
      throw new Error('Invalid payload format');
    }

    let sessionId = cookies().get('sessionId').value;

    // Check if all required fields are present for each item
    for (const item of payload) {
      if (
        !item.id ||
        !item.title ||
        !item.quantity ||
        !item.img ||
        !item.amount ||
        !item.size ||
        !item.sessionId
      ) {
        throw new Error('Missing required fields in payload');
      }
    }

    // Iterate over each item in payload
    for (const item of payload) {
      const existingItem = await Payment.findOne({
        sessionId,
        id: item.id,
        size: item.size
      });

      if (existingItem) {
        // If item exists, update quantity and amount
        existingItem.quantity = item.quantity;
        existingItem.amount = item.amount;
        await existingItem.save();
      } else {
        // If item does not exist, create new Payment document
        const newPayment = new Payment(item);
        await newPayment.save();
      }
    }

    // Fetch all updated or new payment sessions
    const savedPaymentSessions = await Payment.find({ sessionId });

    return NextResponse.json(savedPaymentSessions);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Validation failed', message: err.message });
  }
}

