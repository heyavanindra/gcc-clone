"use client";
import React, { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";

const AddForm = ({ api }) => {
  const [image, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

      setSubmitting(true);
      let downloadUrl;
      if (image) {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
        
          const storage = new Storage(client);
        
          try {
            const response = await storage.createFile(
              process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
              ID.unique(),
              image
            );
            if(response){
              const fileUrl = storage.getFileView( 
                process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ,
                response.$id);
              downloadUrl = fileUrl.href;  
            }
          } catch (error) {
            console.log('Error uploading file:', error);
          }

      const updatedItem = { image: downloadUrl, title, desc };

      try {
        let res = await fetch(api, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify( updatedItem )
        });
        res = await res.json();
        if (res.ok) {
          toast.success("Blog Added!");
        } else {
          throw new Error(res.error || "Failed to Add!");
        }
      } catch (err) {
        toast.error("Failed to Add!");
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="absolute top-40 left-10 p-5 w-96 bg-black rounded-md text-white z-50">
      <Toaster closeButton />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex justify-between">
          <label>Image</label>
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
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
            "Add Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddForm;
