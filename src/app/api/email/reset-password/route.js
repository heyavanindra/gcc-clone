import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';
import { User } from '@/utils/schema';
import mongoose from 'mongoose';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function POST(request) {
    try {
        const { email } = await request.json();

        console.log('Received payload (Backend):', { email });

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found', ok: false });
        }

        // Generate a secure token
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // Generate the reset URL
        const resetUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/resetpassword?token=${token}`;

        const response = await resend.emails.send({
            from: 'reset-password@ggccomp.in',
            to: email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset. Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
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

