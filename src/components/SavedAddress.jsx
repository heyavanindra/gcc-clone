import React, { useEffect, useState } from 'react';

const SavedAddress = ({ onAddNewDetails, onMakePayment, onUpdateForm, dispalyForm }) => {
    const [savedAddress, setSavedAddress] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setSavedAddress(JSON.parse(storedData));
        }
    }, []);

    const handleSelection = () => {
        const newSelection = !isSelected;
        setIsSelected(newSelection);
        if (newSelection) {
            onUpdateForm(savedAddress);
        } else {
            onUpdateForm({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                country: '',
                state: '',
                city: '',
                zipcode: '',
                email: '',
                products: []
            });
        }
    };

    const handleAddNewDetails = () => {
        setIsSelected(false);
        onUpdateForm({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                country: '',
                state: '',
                city: '',
                zipcode: '',
                email: '',
                products: []
            });
        onAddNewDetails();
    };

    return (
        <>
        {
            savedAddress ? <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Saved Address</h2>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleSelection}
                    className="form-checkbox h-5 w-5 text-blue-600"
                />
            </div>
            {!dispalyForm && (
                <div style={{ padding: '10px', backgroundColor: isSelected ? '#d1d5db' : 'transparent' }}>
                    <p><strong>Name:</strong> {savedAddress.firstName} {savedAddress.lastName}</p>
                    <p><strong>Email:</strong> {savedAddress.email}</p>
                    <p><strong>Phone:</strong> {savedAddress.phoneNumber}</p>
                    <p><strong>Country:</strong> {savedAddress.country}</p>
                    <p><strong>Address:</strong> {savedAddress.address}</p>
                    <p><strong>City:</strong> {savedAddress.city}</p>
                    <p><strong>State:</strong> {savedAddress.state}</p>
                    <p><strong>Zip Code:</strong> {savedAddress.zipcode}</p>
                </div>
            )}
            <div className="p-4 border-t flex justify-center gap-5">
               {!dispalyForm && <button
                    onClick={onMakePayment}
                    className="bg-black text-white px-4 py-2 rounded hover:border border-black hover:bg-white hover:text-black focus:outline-none"
                >
                    Complete Payment
                </button>}
                <button
                    onClick={handleAddNewDetails}
                    className="bg-black text-white px-4 py-2 rounded hover:border border-black hover:bg-white hover:text-black focus:outline-none"
                >
                    {!dispalyForm ? 'Add new details' : 'Select this address'}
                </button>
            </div>
        </div> : null
        }
        </>
    );
};

export default SavedAddress;
