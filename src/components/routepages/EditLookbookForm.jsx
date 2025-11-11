"use client";
import React, { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";

const EditLookbookForm = ({ api, initialData, onClose }) => {
  const [imageL, setImgL] = useState("");
  const [imageR, setImgR] = useState("");
  const [banner, setBanner] = useState("");
  const [title, setTitle] = useState(initialData.title || "");
  const [desc, setDesc] = useState(initialData.desc || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title) return alert("Please fill in all required fields.");
  
    setSubmitting(true);
  
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  
    const storage = new Storage(client);
  
    const uploadImage = async (image) => {
      try {
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
          ID.unique(),
          image
        );
        return storage.getFileView(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, response.$id).href;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    };
  
    const downloadUrlL = imageL ? await uploadImage(imageL) : initialData.imageL;
    const downloadUrlR = imageR ? await uploadImage(imageR) : initialData.imageR;
    const downloadBanner = banner ? await uploadImage(banner) : initialData.banner;
  
    const updatedItem = { banner:downloadBanner, imageR: downloadUrlR, imageL: downloadUrlL, title, desc };
  
    try {
      const res = await fetch(api, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Update Successful!");
      } else {
        throw new Error(data.error || "Failed to update!");
      }
    } catch (err) {
      toast.error("Failed to update!");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="absolute top-0 left-10 p-5 w-96 bg-black rounded-md text-white z-50">
      <div className="flex justify-end"> 
      <button onClick={() => onClose()} className="p-2 bg-white text-black">X</button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex justify-between">
          <label>Banner</label>
          <input type="file" onChange={(e) => setBanner(e.target.files[0])} />
        </div>
        <div className="flex justify-between">
          <label>Image Left</label>
          <input type="file" onChange={(e) => setImgL(e.target.files[0])} />
        </div>
        <div className="flex justify-between">
          <label>Image Right</label>
          <input type="file" onChange={(e) => setImgR(e.target.files[0])} />
        </div>
        <div className="flex justify-between">
          <label>Title</label>
          <input
            className="text-black"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
          <div className="flex justify-between">
            <label>Description</label>
            <input
              className="text-black"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>   
        <button
          className="bg-white text-black py-1 px-3 mt-2"
          type="submit"
          disabled={submitting}
        >
          {submitting ? (
            <BeatLoader
              loading={submitting}
              size={10}
              color="black"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditLookbookForm;
