"use client";
import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import EditLookbookForm from "./EditLookbookForm";
import { decode } from 'jsonwebtoken';

const EditBlog = ({ item, api }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);


  const initialData = {
    banner: item.banner,
    title: item.title,
    imageL: item.imageL,
    imageR: item.imageR,
    desc: item.desc
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
    {isAdmin && <div className="flex gap-3">
      <button
        className="bg-black text-white py-1 px-3"
        onClick={handleEditClick}
      >
        Edit
      </button>
      {isEditing && (
        <EditLookbookForm
        api={`${api}/${item._id}`}
        initialData={initialData}
        onClose={handleEditClick}
    />
      )}
    </div>}
    </>
  );
};

export default EditBlog;






