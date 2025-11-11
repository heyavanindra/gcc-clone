import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Order } from '@/utils/schema';

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Connection to MongoDB failed:', err);
    });
}

export async function POST(request) {
    const { email, isAdmin, filter, orderID } = await request.json();

    try {
        let query = {};

        // Validate and include email for non-admin users
        if (!isAdmin && (email)) {
            if (email) query.email = email;
        }

        // Apply additional filters if provided
        if (filter) {
            if (filter.email) {
                query.email = filter.email;
            }

            if (filter.date) {
                const startDate = new Date(filter.date);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 1);
                query.createdAt = { $gte: startDate, $lt: endDate };
            }
        }

        // Validate and include orderID if provided
        if (orderID) {
            // Ensure orderID is valid and not an empty string
            if (typeof orderID === "string" && orderID.trim() !== "") {
                query.orderID = orderID.trim();
            } else {
                return NextResponse.json({ ok: false, message: "Invalid Order ID" });
            }
        }

        // Remove any empty query fields
        Object.keys(query).forEach(key => {
            if (query[key] === '') {
                delete query[key];
            }
        });

        // Fetch orders based on the constructed query
        const orders = await Order.find(query).populate('products');

        if (orders.length > 0) {
            return NextResponse.json(orders);
        } else {
            const message = isAdmin
                ? 'No orders are placed yet!'
                : `No order is associated with the given details!`;
            return NextResponse.json({ ok: false, message });
        }
    } catch (err) {
        console.error("Error in POST /api/orders:", err);
        return NextResponse.json({ ok: false, message: "Internal Server Error" });
    }
}


export async function GET() {
    try {
        const allOrders = await Order.find().select('email createdAt').lean();
        const emails = [...new Set(allOrders.map(order => order.email))];
        const dates = [...new Set(allOrders.map(order => order.createdAt.toISOString().split('T')[0]))];
        return NextResponse.json({ emails, dates });
    } catch (err) {
        return NextResponse.json({ err });
    }
}
