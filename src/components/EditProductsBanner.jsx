"use client";
import React, { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

const EditProductsBanner= ({ banner, api, onClose }) => {
  const [image, setImg] = useState("");
  const [uploading, setUploading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
      let downloadUrl = banner; 

      if (image) {
        const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    
      const storage = new Storage(client);
    
      try {
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
          ID.unique(),
          file
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

      try {
        let res = await fetch(api, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({banner: downloadUrl})
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
        setUploading(false);
      }
  };


  return (
    <>
        <div className="absolute top-20 left-40 p-4 bg-white border border-black rounded-md text-black mt-10">
        <button
            onClick={() => onClose()}
            className="absolute top-2 right-2 text-black text-xl font-bold"
        >
            x
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-black font-semibold">Images:</label>
            <input
                type="file"
                className="border border-black p-1 rounded-md"
                onChange={(e) => setImg(e.target.files[0])}
                required
            />

            <button
                type="submit"
                className='bg-black text-white py-2 px-4 mt-2 rounded-md hover:bg-gray-800 transition'
                disabled={uploading}
            >
                {uploading ? <BeatLoader loading={uploading} size={10} color='white' aria-label="Loading Spinner" data-testid="loader" /> : 'Proceed'}
            </button>
        </form>
    </div>
    </>
  );
};

export default EditProductsBanner;






