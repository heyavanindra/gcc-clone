"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { decode } from 'jsonwebtoken';
import { toast } from "sonner";
import ProductFormModal from "./ProductFormModal";
import { useRouter } from "next/navigation";

function Button({ category, id, title, sizes, amount, img, productType, desc, styleTip, modalInfo }) {
    const { data: session } = useSession();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [mainAdmin, setMainAdmin] = useState(null);
    const [token, setToken] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const router = useRouter();

    const closeProductFormModal = () => {
        setIsFormOpen(!isFormOpen);
    };

    const refreshData = async (category, id) => {
        try {
            let res = await fetch(`/api/${productType}/${category}/${id}`);
            res = await res.json();
            return res;
        } catch (err) {
            console.log(err)
        }
    }

    const handleProductUpdate = async () => {
        await refreshData(category, id)
    }

    const deleteHandler = async (category, id) => {

        try {
            const res = await fetch(`/api/${productType}/${category}/${id}`, {
                method: 'DELETE',
                cache: 'no-store',
            });

            if (res.ok) {
                setConfirm(false);
                router.refresh();
            } else {
                toast.error('Failed to delete item from the database!');
            }
        } catch (err) {
            console.log(err);
            toast.error('An error occurred while deleting the item.');
        }
    };

    const delConfirmHandler = () => {
        setConfirm(!confirm);
    }

    useEffect(() => {
        if (session) {
            setToken(session.user.accessToken);
        }
    }, [session]);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsAdmin(decodedToken.isAdmin);
                    setMainAdmin(decodedToken.email);
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        } else {
            setIsAdmin(false);
            setMainAdmin(null);
        }
    }, [token]);


    return (
        <>

            {
                confirm && <div className="absolute left-1/2 top-1/2 h-44 w-96 bg-white rounded-md border flex flex-col justify-center items-center gap-8">
                    <p>Are all the sizes sold out?</p>
                    <div className="flex gap-5 px-2">
                        <button onClick={delConfirmHandler} className="px-3 py-1 bg-white border">Cancel</button>
                        <button onClick={() => deleteHandler(category, id, img)} className="px-3 py-1 bg-black text-white">Proceed</button>
                    </div>
                </div>
            }

            {isAdmin && <div>
                <button className="px-3 py-1 text-white bg-black mr-3" onClick={() => setIsFormOpen(!isFormOpen)}>Edit</button>
                {mainAdmin === 'alok@admin.com' && <button className="px-3 py-1 text-white bg-black" onClick={delConfirmHandler}>Delete</button>}
            </div>}



            {isFormOpen && <ProductFormModal onClose={closeProductFormModal} onProductAdd={handleProductUpdate} apiRoute={`/api/${productType}/${category}/${id}`}
                storagePath={`productImages/${category}`} method={'PUT'} maintitle={category} desc={desc} styleTip={styleTip} modalInfo={modalInfo}
                titles={title} amounts={amount} sizes={sizes} img={img} 
            />}
        </>
    )
}

export default Button;