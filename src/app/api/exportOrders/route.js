import { Order } from '@/utils/schema';
import * as XLSX from 'xlsx';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await Order.find({});
    const data = orders.map(order => ({
      customerName: `${order.firstName} ${order.lastName}`,
      orderID: order.orderID,
      email: order.email,
      createdAt: order.createdAt,
      address: order.address,
      phoneNumber: order.phoneNumber,
      country: order.country,
      state: order.state,
      city: order.city,
      zipcode: order.zipcode,
      products: order.products.map(product => ({
        title: product.title,
        amount: product.amount,
        currency: product.currency,
      })).join('; '),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    const excelBuffer = buffer.toString('base64');

    return NextResponse.json({ excelBuffer });
  } catch (error) {
    console.error('Failed to export orders:', error.message);
    return NextResponse.json({ error: 'Failed to export orders' }, { status: 500 });
  }
}
