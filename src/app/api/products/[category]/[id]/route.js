import { NextResponse } from 'next/server';
import { Featured } from '@/utils/schema'; 
import mongoose from 'mongoose';

// Ensure mongoose connects only once
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

  export async function GET(request, { params }) {
    try {
      const { category, id } = params;
  
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
      }
      
      if (category === 'shop_all') {
        const products = await Featured.find();
        const allProducts = products.flatMap(item => item.product);
        const singleItem = allProducts.find(item => item._id.toString() === id);
        if (singleItem) {
          return NextResponse.json(singleItem);
        } else {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
      }
     
      const product = await Featured.findOne(
        { mainTitle: category, 'product._id': id },
        { 'product.$': 1 } // This will only return the matched product in the array
      );
  
      if (product && product.product.length > 0) {
        return NextResponse.json(product.product[0]);
      } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Something went wrong', details: err.message }, { status: 500 });
    }
  }



  export async function PUT(request, { params }) {
    try {
      const { category, id } = params;
      const updates = await request.json();
  
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
      }
  
      // Update specific fields in the product array
      const updateFields = {};
      
      // Build the update fields object based on the updates
      for (const [key, value] of Object.entries(updates)) {
        if (key !== '_id') {
          updateFields[`product.$.${key}`] = value;
        }
      }
  
      // Find the product by id within the specified category and update it
      const product = await Featured.findOneAndUpdate(
        { mainTitle: category, 'product._id': id },
        { $set: updateFields },
        { new: true, runValidators: true } // Return the updated document and validate the updates
      );
  
      if (product) {
        return NextResponse.json({ ok: true });
      } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Something went wrong', details: err.message }, { status: 500 });
    }
  }
  
  export async function DELETE(request, { params }) {
    try {
      const { category, id } = params;
      console.log(category, id);
  
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return new Response(JSON.stringify({ error: 'Invalid product ID' }), { status: 400 });
      }
  
      // Update all quantities in the sizes array to zero for the specified product
      const updateResult = await Featured.updateOne(
        { mainTitle: category, 'product._id': id },
        { $set: { 'product.$.quantity.size.$[elem].quantity': 0 } },
        { arrayFilters: [{ 'elem.size': { $exists: true } }] }
      );
  
      // Check if any product quantity was updated
      if (updateResult.modifiedCount > 0) {
        return NextResponse.json({ ok: true });
      } else {
        return NextResponse.json({ ok: false });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: err.message });
    }
  }
  