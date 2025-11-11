Urban Gents – Men’s Shopping E-Commerce Platform

This is a Next.js
 project bootstrapped with create-next-app
.

Urban Gents is a full-stack e-commerce application designed exclusively for men’s shopping needs.
Built with Next.js 14, it offers a modern, fast, and secure shopping experience, integrated with NextAuth for seamless authentication and MongoDB Atlas for scalable data storage.

🚀 Tech Stack
Layer	Technology Used
Frontend	Next.js 14, React, Tailwind CSS
Backend	Next.js API Routes
Authentication	NextAuth.js (Email/Google login)
Database	MongoDB Atlas with Mongoose ORM
State	React Hooks / Context API
Deployment	Vercel (Frontend + Backend)
✨ Features

🛒 Product Catalog – Browse men’s fashion, accessories, and grooming products.

🔍 Search & Filter – Quickly find products by category, price, or keyword.

👤 User Authentication – Secure login/signup via NextAuth.

❤️ Wishlist – Save favorite products for later.

🛍 Cart & Checkout – Smooth cart management and order placement.

📦 Order Management – Track and manage past orders.

📱 Responsive Design – Fully optimized for all devices.

🔐 Secure Sessions – Encrypted tokens and session storage in MongoDB.

📂 Project Structure
urban-gents/
├── app/               # App Router Pages (Next.js 14)
├── components/        # Reusable UI components
├── lib/               # Configurations and utility functions
├── models/            # MongoDB Mongoose models
├── pages/api/         # API routes (Next.js backend)
├── public/            # Static assets (images, icons, etc.)
├── styles/            # Tailwind global styles
└── .env.local         # Environment variables

🛠 Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/urban-gents.git
cd urban-gents

2️⃣ Install dependencies
npm install


or use

yarn install

3️⃣ Configure environment variables

Create a .env.local file in the root directory with:

# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google Auth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

4️⃣ Run the development server
npm run dev
# or
yarn dev


Open http://localhost:3000
 in your browser.

🧠 Learn More

Next.js Documentation
 – Explore advanced features and APIs.

Learn Next.js
 – Interactive tutorials for beginners.

NextAuth Documentation
 – Authentication details.

MongoDB Atlas Documentation
 – Database management and integration.

🚀 Deployment

Deploy seamlessly using Vercel:

Push your code to GitHub.

Import the project into Vercel
.

Add the required environment variables in Vercel’s dashboard.

Deploy and get your production-ready URL.