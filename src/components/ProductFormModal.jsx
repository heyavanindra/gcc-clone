"use client";
import { useState, useEffect } from "react";
import { Client, Storage, ID, ImageFormat } from "appwrite";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

function ProductFormModal({ onClose, apiRoute, maintitle, method,
    titles, amounts, sizes, img, desc, styleTip, modalInfo
}) {
    const [title, setTitle] = useState(titles || '');
    const [amount, setAmount] = useState(amounts || '');
    const [description, setDesc] = useState(desc || {info: '', features: '', sizing: ''});
    const [style, setStyle] = useState(styleTip || '');
    const [modal, setModal] = useState(modalInfo || '');
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [quantity, setQuantity] = useState([]);

    useEffect(() => {
        // Define all possible sizes
        const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

        // Create an initial quantity state based on the sizes prop
        const initialQuantity = allSizes.map(size => ({
            size,
            quantity: sizes && sizes.find(s => s.size === size) ? sizes.find(s => s.size === size).quantity : 0
        }));

        setQuantity(initialQuantity);
    }, [sizes]);

    const handleQuantityChange = (size, value) => {
        const updatedQuantity = quantity.map(q =>
            q.size === size ? { ...q, quantity: value } : q
        );
        setQuantity(updatedQuantity);
    };

    const handleImageChange = (files) => {
        setImages(Array.from(files));
    };
    


    const uploadImageToFirebase = async (file) => {
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
              const fileUrl = storage.getFilePreview( 
                process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ,
                response.$id );
              return fileUrl.href;  
            }
          } catch (error) {
            console.log('Error uploading file:', error);
          }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            const uploadedImageUrls = await Promise.all(Array.from(images).map(img => uploadImageToFirebase(img)));

            const productData = {
                maintitle,
                product: [{
                    title,
                    quantity: { size: quantity },
                    amount: Number(amount),
                    img: uploadedImageUrls.length > 0 ? uploadedImageUrls : img || [],
                    desc : description,
                    styleTip: style,
                    modalInfo: modal
                }]
            };

            let res = await fetch(apiRoute, {
                method: method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(method === 'POST' ? productData : productData.product[0])
            });

            res = await res.json();

            if (res.ok) {
                toast.success('Operation Successful!');
                onClose();
            } else {
                toast.error('Operation Failed!');
            }
        } catch (err) {
            toast.error('Operation Failed!');
            console.log(err);
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="absolute top-20 left-40 p-4 bg-white border border-black rounded-md text-black mt-10 z-50">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-black text-xl font-bold"
            >
                x
            </button>
            <form onSubmit={submitHandler} className="flex flex-col gap-3">
                <label htmlFor="title" className="text-black font-semibold">Title:</label>
                <input
                    type="text"
                    className="border border-black p-2 rounded-md"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="amount" className="text-black font-semibold">Amount:</label>
                <input
                    type="number"
                    className="border border-black p-2 rounded-md"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <label className="text-black font-semibold">Quantity:</label>
                <div className="grid grid-cols-3 gap-4">
                    {quantity.map((q, index) => (
                        <div key={index} className='flex gap-2 mb-2'>
                            <span className="border border-black p-1 rounded-md">{q.size}</span>
                            <input
                                type="number"
                                min={0}
                                className="border border-black p-1 rounded-md"
                                placeholder="Quantity"
                                value={q.quantity}
                                onChange={(e) => handleQuantityChange(q.size, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <label className="text-black font-semibold">Images:</label>
                <input
                    type="file"
                    className="border border-black p-1 rounded-md"
                    multiple
                    onChange={(e) => handleImageChange(e.target.files)}
                />

                <label className="text-black font-semibold">Description:</label>
              
               
                    <label htmlFor="info" className="text-black font-semibold">Info:</label>
                    <textarea onChange={(e) => setDesc({...description,info: e.target.value})} className="border border-black" id="info" value={description.info}></textarea>
                
               
                    <label htmlFor="features" className="text-black font-semibold">Features:</label>
                    <input className="border border-black p-2 rounded-md" onChange={(e) => setDesc({...description,features: e.target.value})} id="features" value={description.features} />
                
                    <label htmlFor="sizing" className="text-black font-semibold">Sizing:</label>
                    <input className="border border-black p-2 rounded-md" onChange={(e) => setDesc({...description,sizing: e.target.value})} id="sizing" value={description.sizing} />
               
             

               <label htmlFor="style" className="text-black font-semibold">Style Tip:</label>
               <input type="text" className="border border-black p-2 rounded-md" value={style} onChange={(e) => setStyle(e.target.value)}/>

               <label htmlFor="modal" className="text-black font-semibold">Modal Info:</label>
               <input type="text" className="border border-black p-2 rounded-md" value={modal} onChange={(e) => setModal(e.target.value)}/>

                <button
                    type="submit"
                    className='bg-black text-white py-2 px-4 mt-2 rounded-md hover:bg-gray-800 transition'
                    disabled={uploading}
                >
                    {uploading ? <BeatLoader loading={uploading} size={10} color='white' aria-label="Loading Spinner" data-testid="loader" /> : 'Proceed'}
                </button>
            </form>
        </div>
    );
}

export default ProductFormModal;
