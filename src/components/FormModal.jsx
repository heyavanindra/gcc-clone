"use client"
import { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

function FormModal({ onClose, onImageUpload }) {
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        setUploading(true);
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
                if (response) {
                    const fileUrl = storage.getFileView(
                        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
                        response.$id);
                    downloadUrl = fileUrl.href;
                }
            } catch (error) {
                console.log('Error uploading file:', error);
            }


            const formData = { images: downloadUrl };

            try {
                let res = await fetch('/api/updates/carousel', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                res = await res.json();
                if (res.ok) {
                    toast.success('Image uploaded!');
                    onImageUpload();
                    onClose();
                }
            } catch (err) {
                toast.error('Failed to upload image!');
                console.log(err);
            } finally {
                setUploading(false);
            }
        } else {
            alert("Please select an image.");
            setUploading(false);
        }
    };

    return (
        <div className="absolute top-40 left-40 p-5 w-96 bg-black rounded-md text-white">
            <form onSubmit={submitHandler} className="w-full">
                <div className="flex flex-col gap-2">
                    <label htmlFor="img">Insert Image: </label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button className='bg-white text-black py-1 px-3 mt-2' disabled={uploading}>{uploading ? <BeatLoader loading={uploading} size={10} color='black'
                    aria-label="Loading Spinner"
                    data-testid="loader" /> : 'Upload'}</button>
            </form>
        </div>
    )
}

export default FormModal;