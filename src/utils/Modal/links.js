import mongoose from "mongoose";

if (mongoose.models.Link) {
    delete mongoose.models.Link;
  }

const linkSchema = new mongoose.Schema({
    title: String,
    subLinks: [
        {
            title: String,
            sublink: [
                {
                    url: String,
                    title: String
                }
            ]
        }
    ],
    images: [{
        img: String,
        alt: String,
        text: String,
        url: String
    }]
  })
  
  export const Link = mongoose.models.Link || mongoose.model('Link', linkSchema);