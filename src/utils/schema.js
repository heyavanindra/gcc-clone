import mongoose from "mongoose";


// Users Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String, required: [true, "Email is required"],
    unique: true,
  },
  password: String,
  accessToken: String,
  isAdmin: {type: Boolean},
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);


export const allProductSchema = new mongoose.Schema({
  mainTitle: String,
  banner: String,
  product : [{
    title: String,
    amount: Number,
    img: [String],
    desc: { info : String, features: [String], sizing: String},
    styleTip: String,
    modalInfo: String,
    quantity : {
      size: [
        {
          quantity: Number,
          size: String
        }
      ]
    }
  }]
})

export const Featured = mongoose.models.Featured || mongoose.model( 'Featured', allProductSchema); 
export const Type = mongoose.models.Type || mongoose.model( 'Type', allProductSchema); 
export const Collection = mongoose.models.Collection || mongoose.model( 'Collection', allProductSchema); 

const cartItemSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  img: [String],
  amount: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  sessionId: String,
});

export const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);



const paymentSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  img: [String],
  amount: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  sessionId: String,
});

export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  orderID: String,
  email: {
    type: String,
    required: true,
  },
  createdAt: {type: Date, default: Date.now()},
  address: String,
  phoneNumber: Number,
  country: String,
  state: String,
  city: String,
  zipcode: Number,
  products: [{ 
    img: [String],
    amount: Number,
    size: String,
    quantity: Number,
    title: String,
    currency: String
   }], 
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);


