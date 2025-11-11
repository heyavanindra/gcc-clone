import mongoose from "mongoose";

const mainCarousalSchema = new mongoose.Schema({
    images: String 
});

export const MainCarousel = mongoose.models.MainCarousel || mongoose.model('MainCarousel', mainCarousalSchema);
