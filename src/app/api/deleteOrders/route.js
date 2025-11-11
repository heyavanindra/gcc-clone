import { Order } from '@/utils/schema';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    await Order.deleteMany({ createdAt: { $lt: sixMonthsAgo } });

    return NextResponse.json({ message: 'Old orders deleted successfully' });
  } catch (error) {
    console.error('Failed to delete old orders:', error.message);
    return NextResponse.json({ error: 'Failed to delete old orders' }, { status: 500 });
  }
}
