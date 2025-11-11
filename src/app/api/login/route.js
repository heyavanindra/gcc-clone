import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/utils/schema";

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection to MongoDB failed:", err));
}

export async function POST(request) {
  try {
    const { email, password } = await request.json(); 

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "No user found!", ok: false }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Email or password is incorrect!", ok: false }, { status: 401 });
    }

    const tokenPayload = { email: user.email, isAdmin: user.isAdmin };
    const accessToken = jwt.sign(tokenPayload, process.env.AUTH_SECRET, { expiresIn: '1h' });

    // Store the access token in the user's record
    user.accessToken = accessToken;
    await user.save();

    return NextResponse.json({ email: user.email, res: accessToken, ok: true }); // Ensure the response contains necessary fields
  } catch (e) {
    console.error("Error during authentication:", e.message);
    return NextResponse.json({ message: "Something went wrong!", error: e.message, ok: false }, { status: 500 });
  }
};


export async function PUT(request) {
  try {
    const { token, password } = await request.json();

    const user = await User.findOne({
        resetPasswordToken: token,
    });

    if (!user || user.resetPasswordExpires < Date.now()) {
        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
        }
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = "";
    await user.save();

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
} catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}
};
