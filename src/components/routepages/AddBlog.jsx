"use client";
import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import AddForm from "./AddFrom";
import { decode } from 'jsonwebtoken';

const AddBlog = ({ api, storageUrl }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

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
    setIsAdding(!isAdding);
  };

  return (
    <>
    {isAdmin && <div>
      <button
        className="bg-black text-white py-1 px-3"
        onClick={handleEditClick}
      >
        Add New Blog
      </button>
      {isAdding && (
        <AddForm
        api={api}
        initialData={""}
        storageUrl={storageUrl}
    />
      )}
    </div>}
    </>
  );
};

export default AddBlog;






