// src/app/api/email/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createEmailHtml } from '@/lib/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { email, orderId, products, customerData } = await request.json();

        // Debug: Check the received payload
        //console.log('Received payload (Backend):', { email, orderId, products, customerData });

        // Validate the required fields
        if (!orderId || !products) {
            return NextResponse.json({ error: 'Missing orderId or products', ok: false });
        }

        const emailContent = createEmailHtml(products, orderId, customerData);

        const response = await resend.emails.send({
            from: 'no-reply@ggccomp.in',
            to: email,
            bcc: 'orderggcin@gmail.com',
            subject: 'Order Data',
            html: emailContent
        });

        console.log('Email send response:', response);

        if (response.error) {
            return NextResponse.json({ error: response.error, ok: false });
        }

        return NextResponse.json({ data: response.data, ok: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message, ok: false });
    }
}
