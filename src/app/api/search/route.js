// pages/api/search.js
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Featured, Type, Collection } from '@/utils/schema';

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

const searchProducts = async (searchTerm) => {
  const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search

  const [featuredResults, typeResults, collectionResults] = await Promise.all([
    Featured.find({ 'product.title': regex }),
    Type.find({ 'product.title': regex }),
    Collection.find({ 'product.title': regex })
  ]);

  return {
    featured: featuredResults,
    type: typeResults,
    collection: collectionResults
  };
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' });
  }

  try {
    const results = await searchProducts(query);
    return NextResponse.json(results);
  } catch (err) {
    console.error('Error searching products:', err);
    return NextResponse.json({ error: 'An error occurred while searching products' });
  }
}
