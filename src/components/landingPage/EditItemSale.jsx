"use client";
import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import GeneralForm from "../GeneralForm";
import { decode } from 'jsonwebtoken';

const EditItemSale = ({ item, api, storageUrl }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  const initialData = {
    title: item.title,
    image: item.image,
    url: item.url
  };

  const { data } = useSession();

    useEffect(() => {
        if (data) {
            setToken(data.user.accessToken);
        }
    }, [data]);

  useEffect(() => {
    if (token) {
        try {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                setIsAdmin(decodedToken.isAdmin);
            } 
        } catch (error) {
            console.error("Invalid token:", error);
        }
    } else {
        setIsAdmin(false);
    }
}, [token]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
   {isAdmin && <div className="">
      <button
        className="absolute top-2 bg-black text-white py-1 px-3"
        onClick={handleEditClick}
      >
        Edit
      </button>
      {isEditing && (
        <GeneralForm
        api={`${api}/${item._id}`}
        initialData={initialData}
        storageUrl={storageUrl}
        onClose={handleEditClick}
    />
      )}
    </div>}
    </>
  );
};

export default EditItemSale;






