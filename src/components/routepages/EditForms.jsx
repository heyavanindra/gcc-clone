"use client";
import React, { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";

const EditForms = ({ api, initialData }) => {
  const [image, setImg] = useState("");
  const [title, setTitle] = useState(initialData.title || "");
  const [desc, setDesc] = useState(initialData.desc || "");
  const [url, setUrl] = useState(initialData.url || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title) {
      setSubmitting(true);
      let downloadUrl = initialData.image; // Use existing image URL by default

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
      }

      const updatedItem = { image: downloadUrl, title, url, desc };

      try {
        let res = await fetch(api, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify( updatedItem )
        });
        res = await res.json();
        if (res.ok) {
          toast.success("Update Successful!");
        } else {
          throw new Error(res.error || "Failed to update!");
        }
      } catch (err) {
        toast.error("Failed to update!");
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
        {initialData.desc && (
          <div className="flex justify-between">
            <label>Description</label>
            <input
              className="text-black"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        )}
        {
          initialData.url && <div className="flex justify-between">
          <label>URL</label>
          <input
            className="text-black"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div> 
        }
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

export default EditForms;
