import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    image: String,
    title: String,
    title2: String,
    url: String,
    url2: String
})

export const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);

const ourCollectionSchema = new mongoose.Schema({
    mainTitle : String,
    items: [
        {
            image: String,
            url: String,
            title: String,
        }
    ]
})

export const OurCollection = mongoose.models.OurCollection || mongoose.model('OurCollection', ourCollectionSchema);

const dualTileSchema = new mongoose.Schema({
    title: String,
    image: String,
    desc: String,
    url: String
})

export const DualTile = mongoose.models.DualTile || mongoose.model('DualTile', dualTileSchema);

const itemSaleSchema = new mongoose.Schema({
    title: String,
    image: String,
    url: String
})

export const ItemSale = mongoose.models.ItemSale || mongoose.model('ItemSale', itemSaleSchema);


const counterSchema = new mongoose.Schema({
    title: String,
    count: Date,
    url: String
})

export const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);


const counterSaleSchema = new mongoose.Schema({
    title: String,
    image: String,
    url: String
})

export const CounterSale = mongoose.models.CounterSale || mongoose.model('CounterSale', counterSaleSchema);

const blogSchema = new mongoose.Schema({
    title: String,
    desc: String,
    image: String
})

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

const reviewSectionSchema = new mongoose.Schema({
    title: String,
    desc: String,
    date: Date,
    image: String,
    url: String,
    name: String
})

export const ReviewSection = mongoose.models.ReviewSection || mongoose.model('ReviewSection', reviewSectionSchema);

const beforeafterSchema = new mongoose.Schema({
    title: String,
    desc: String,
    imageB: String,
    imageT: String,
})

export const BeforeAfter = mongoose.models.BeforeAfter || mongoose.model('BeforeAfter', beforeafterSchema);

const addressSchema = new mongoose.Schema({
    storeName: String,
    address: String,
    zipcode: Number,
    image: String,
    openOn: String,
})

export const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);

const lookbookSchema = new mongoose.Schema({
    banner: String,
    title: String,
    imageL: String,
    imageR: String,
    desc: String,
})

export const Lookbook = mongoose.models.Lookbook || mongoose.model('Lookbook', lookbookSchema);