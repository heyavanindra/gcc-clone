"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SelectCountry from './SelectCountry';
import ProductPrice from './ProductPrice';
import { useSelector } from 'react-redux';
import { RiDeleteBinLine } from "react-icons/ri";
import FadeLoader from "react-spinners/FadeLoader";
import SavedAddress from './SavedAddress';
import shortid from "shortid";
import usePrice from '@/hooks/usePrice';
import BeatLoader from "react-spinners/BeatLoader";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


const countryCurrencyMap = {
    INR: 'India',
    USD: 'USA',
    EUR: 'Europe',
    GBP: 'UK'
};

const customStyles = `
.react-tel-input .form-control {
    padding-left: 50px; // Adjust this value as needed
}
`;

const allowedCountries = ['us', 'gb', 'in', 'fr'];

const getCountryCode = (currency) => {
    switch (currency) {
        case 'INR':
            return 'in';
        case 'USD':
            return 'us';
        case 'GBP':
            return 'gb';
        case 'EUR':
            return 'fr';
        default:
            return 'in';
    }
};

function PaymentForm() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [processLoad, setProcessLoad] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [razorLoading, setRazorLoading] = useState(false);
    const currency = useSelector((state) => state.currency.currency);
    const currencySymbols = useSelector((state) => state.currency.currencySymbols);
    const [formErrors, setFormErrors] = useState({});

    let payAmount = data.reduce((total, payment) => total + payment.amount, 0);
    let finalAmount = usePrice(currency === 'INR' ? payAmount : payAmount * 2).toFixed(2);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        country: countryCurrencyMap[currency],
        state: '',
        city: '',
        zipcode: '',
        email: '',
        products: []
    });

    const savedFormUpdate = (data) => {
        setFormData({ ...data })
    }


    const displayFormHandler = () => {
        setShowForm(!showForm);
    }


    const fetchCityAndState = async (zipcode) => {
        let response = await fetch(`https://api.postalpincode.in/pincode/${zipcode}`);
        response = await response.json();
        if (response[0] && response[0].PostOffice && response[0].PostOffice.length > 0) {
            const postOffice = response[0].PostOffice[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                city: postOffice.District || '',
                state: postOffice.State || ''
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                city: '',
                state: ''
            }));
        }
    };

    useEffect(() => {
        fetchCityAndState(formData.zipcode);

    }, [formData.zipcode]);

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCountryChange = (currency) => {
        const country = countryCurrencyMap[currency];
        const countryCode = getCountryCode(currency);
        setFormData({ ...formData, country, phoneNumber: `+${countryCode}` });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phoneNumber: value });
    };

    useEffect(() => {
        handleCountryChange(currency);
    }, [currency]);


    const validateField = (name, value) => {
        let errors = { ...formErrors };

        switch (name) {
            case "firstName":
            case "lastName":
                if (!value) {
                    errors[name] = "This field is required";
                } else {
                    delete errors[name];
                }
                break;
            case "phoneNumber":
                // Validation handled by the phone input component
                if (!value || !/^\+?\d{10,15}$/.test(value)) {
                    errors[name] = "Phone number is invalid";
                } else {
                    delete errors[name];
                }
                break;
            case "email":
                if (!/\S+@\S+\.\S+/.test(value)) {
                    errors[name] = "Email is invalid";
                } else {
                    delete errors[name];
                }
                break;
            case "zipcode":
                if (!/^\d{5,6}$/.test(value)) {
                    errors[name] = "Zip code is invalid";
                } else {
                    delete errors[name];
                }
                break;
            default:
                if (!value) {
                    errors[name] = "This field is required";
                } else {
                    delete errors[name];
                }
                break;
        }

        setFormErrors(errors);
    };

    const isFormValid = () => {
        const { firstName, lastName, phoneNumber, address, state, city, zipcode, email } = formData;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+?\d{10,15}$/; // Adjusted to match international format
        return firstName && lastName && phoneNumber && phonePattern.test(phoneNumber) && address && state && city && zipcode && emailPattern.test(email);
    };

    const makePayment = async (e) => {
        e.preventDefault();
        setProcessLoad(true);
        setRazorLoading(true);
    
        if (!isFormValid()) {
            toast.warning("Please fill out all the fields properly or select a saved address.", {
                position: 'top-center'
            });
            setProcessLoad(false);
            setRazorLoading(false);
            return;
        }
    
        // Add products IDs to formData
        const updatedFormData = {
            ...formData,
            orderID: shortid.generate(),
            products: data.map(product => ({
                img: product.img,
                amount: product.amount,
                size: product.size,
                quantity: product.quantity,
                title: product.title,
                currency: currencySymbols[currency]
            }))
        };
    
        console.log(updatedFormData);
        
        const emailPayload = {
            email: updatedFormData.email,
            orderId: updatedFormData.orderID,
            products: updatedFormData.products,
            customerData: formData
        };
    
        // Debug: Check if emailPayload is correctly constructed
    
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
    
        const res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            setProcessLoad(false);
            setRazorLoading(false);
            return;
        }
    
        try {
            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taxAmt: finalAmount,
                    selectedCurrency: currency
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                alert(`Server error: ${errorData.error}`);
                setProcessLoad(false);
                setRazorLoading(false);
                return;
            }
    
            const data = await response.json();
            // Debug: Check the payment data
            console.log('Payment data:', data);
    
            var options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                name: "Golden Ghaf",
                currency: data.currency,
                amount: data.amount,
                order_id: data.id,
                description: "Thank you for your purchase",
                handler: async function (response) {
                    setRazorLoading(false);
                    setRedirecting(true);
    
                    try {
                        let resOrder = await fetch('/api/orders', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(updatedFormData)
                        });
    
                        resOrder = await resOrder.json();
                        if (resOrder.ok) {
                            let email = await fetch('/api/email', {
                                method: "POST",
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(emailPayload)
                            });
    
                            const emailText = await email.text();
                            email = JSON.parse(emailText);
                            if (email.ok) {
                                let res = await fetch('/api/payment', {
                                    method: 'DELETE',
                                    cache: 'no-store'
                                });
    
                                res = await res.json();
                                if (res.ok) {
                                    let cartDel = await fetch('/api/cart', {
                                        method: 'DELETE',
                                        credentials: 'include'
                                    });
    
                                    cartDel = await cartDel.json();
                                    if (cartDel.ok) {
                                        setProcessLoad(false);
                                        router.push('/orders/' + resOrder.order._id);
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        console.error('Error:', err);
                        setRedirecting(false);
                        setRazorLoading(false);
                    }
                },
                prefill: {
                    name: `${formData.firstName}${formData.lastName}`,
                    email: `${formData.email}`,
                    contact: `${formData.phoneNumber}`,
                },
            };
    
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error('Fetch error:', err);
            alert(`Fetch error: ${err.message}`);
        } finally {
            setProcessLoad(false);
            setRazorLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            let res = await fetch('/api/payment/' + id, {
                method: 'DELETE',
                cache: 'no-store'
            });
            res = await res.json();
            if (res.ok) {
                toast.success('Item removed!');
                const getData = async () => {
                    try {
                        const res = await fetch('/api/payment', {
                            method: 'GET',
                            credentials: 'include' // Ensure cookies are sent
                        });
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const data = await res.json();
                        if (data.length === 0) {
                            router.back();
                        }
                        setData(data);
                    } catch (error) {
                        console.error('Error fetching cart data:', error.message);
                    }
                }
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('/api/payment', {
                    method: 'GET',
                    credentials: 'include' // Ensure cookies are sent
                });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart data:', error.message);
            }
        }
        getData();
    }, []);

    const cancelHandler = async () => {
        try {
            let res = await fetch('/api/payment', {
                method: 'DELETE',
                cache: 'no-store'
            });
            res = await res.json();

            if (res.ok) {
                router.back();
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="font-[sans-serif] bg-white pt-32">
            {razorLoading && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-transparent">
                    <div className='flex flex-col items-center'>
                        <span className="mb-4 text-2xl text-gray-700">Please wait...</span>
                        <BeatLoader loading={razorLoading} size={20} color='black' />
                    </div>
                </div>
            )}
            {redirecting && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-transparent">
                    <div className='flex flex-col items-center bg-white rounded-md p-4'>
                        <span className="mb-4 text-2xl text-gray-700">Creating order summary, please wait...</span>
                        <img src="/box.gif" alt="Packaging Animation" className="mb-4 w-28 h-28" />
                    </div>
                </div>
            )}

            <div className="flex max-sm:flex-col gap-12 max-lg:gap-4">

                <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-[calc(100vh-8rem)] sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px] overflow-y-auto scrollbar-hide">
                    <div className="flex flex-col h-full relative">
                        <div className="px-4 py-8 flex-grow">
                            <div className="space-y-4">
                                {loading ? (
                                    <div className='h-[calc(100vh-6rem)] flex justify-center items-center'>
                                        <FadeLoader loading={loading} size={10} color='gray' aria-label="Loading Spinner" data-testid="loader" />
                                    </div>
                                ) : data.length > 0 ? (
                                    <>
                                        {data.map((item, index) => (
                                            <div key={index}>
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-600 rounded-md">
                                                        <img src={item.img[0]} alt={item.title} className="w-full object-contain" />
                                                    </div>
                                                    <div className="w-full">
                                                        <div className='flex justify-between mb-2'>
                                                            <h3 className="text-base text-white">{item.title}</h3>
                                                            <button className='text-xl text-white' onClick={() => deleteItem(item._id)}><RiDeleteBinLine /></button>
                                                        </div>
                                                        <ul className="text-xs text-gray-300 space-y-2 mt-2">
                                                            <li className="flex flex-wrap gap-4">Size <span className="ml-auto">{item.size}</span></li>
                                                            <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{item.quantity}</span></li>
                                                            <li className="flex flex-wrap gap-4">Amount <span className="ml-auto"><ProductPrice price={item.amount} /></span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p className='text-white text-2xl text-center'>No Items</p>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-800 w-full p-4">
                            <h4 className="flex flex-wrap gap-4 text-base text-white">Total <span className="ml-auto"><ProductPrice price={payAmount} /></span></h4>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">

                    {data.length > 0 ? <>
                        <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
                        <SavedAddress onMakePayment={makePayment} onUpdateForm={savedFormUpdate} onAddNewDetails={displayFormHandler} dispalyForm={showForm} />
                        {
                            showForm && localStorage.getItem('formData') && <div>
                            <style>{customStyles}</style>
                            <form className="mt-8 space-y-6" onSubmit={makePayment}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input type="text" name="firstName" id="firstName" autoComplete="given-name" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} required />
                                        {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input type="text" name="lastName" id="lastName" autoComplete="family-name" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} required />
                                        {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <PhoneInput
                                            country={getCountryCode(currency)}
                                            value={formData.phoneNumber}
                                            onChange={handlePhoneChange}
                                            onBlur={() => handleBlur({ target: { name: 'phoneNumber', value: formData.phoneNumber } })}
                                            inputProps={{
                                                name: 'phoneNumber',
                                                required: true,
                                                autoComplete: 'tel',
                                                className: 'mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm'
                                            }}
                                            onlyCountries={allowedCountries}
                                        />
                                        {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" name="email" id="email" autoComplete="email" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.email} onChange={handleChange} onBlur={handleBlur} required />
                                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                        <input type="text" name="address" id="address" autoComplete="street-address" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.address} onChange={handleChange} onBlur={handleBlur} required />
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                        <SelectCountry onGetCountry={handleCountryChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                                        <input type="text" name="zipcode" id="zipcode" autoComplete="postal-code" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.zipcode} onChange={handleChange} onBlur={handleBlur} required />
                                        {formErrors.zipcode && <p className="text-red-500 text-xs mt-1">{formErrors.zipcode}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                        <input type="text" name="state" id="state" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.state} onChange={handleChange} onBlur={handleBlur} required />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" name="city" id="city" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.city} onChange={handleChange} onBlur={handleBlur} required />
                                    </div>
                                </div>
                    
                                <div className="flex justify-between items-center">
                                    <button type="button" onClick={cancelHandler} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-white hover:text-black hover:border-black">
                                        {processLoad ? <BeatLoader loading={processLoad} size={10} color='white' /> : "Pay Now"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        }
                        {
                            !localStorage.getItem('formData') && <form className="mt-8 space-y-6" onSubmit={makePayment}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input type="text" name="firstName" id="firstName" autoComplete="given-name" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} required />
                                        {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input type="text" name="lastName" id="lastName" autoComplete="family-name" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} required />
                                        {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <PhoneInput
                                            country={getCountryCode(currency)}
                                            value={formData.phoneNumber}
                                            onChange={handlePhoneChange}
                                            onBlur={() => handleBlur({ target: { name: 'phoneNumber', value: formData.phoneNumber } })}
                                            inputProps={{
                                                name: 'phoneNumber',
                                                required: true,
                                                autoComplete: 'tel',
                                                className: 'mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm'
                                            }}
                                            onlyCountries={allowedCountries}
                                        />
                                        {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" name="email" id="email" autoComplete="email" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.email} onChange={handleChange} onBlur={handleBlur} required />
                                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                        <input type="text" name="address" id="address" autoComplete="street-address" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.address} onChange={handleChange} onBlur={handleBlur} required />
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                        <SelectCountry onGetCountry={handleCountryChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                                        <input type="text" name="zipcode" id="zipcode" autoComplete="postal-code" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.zipcode} onChange={handleChange} onBlur={handleBlur} required />
                                        {formErrors.zipcode && <p className="text-red-500 text-xs mt-1">{formErrors.zipcode}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                        <input type="text" name="state" id="state" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.state} onChange={handleChange} onBlur={handleBlur} required />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" name="city" id="city" className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm" value={formData.city} onChange={handleChange} onBlur={handleBlur} required />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <button type="button" onClick={cancelHandler} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-white hover:text-black hover:border-black">
                                        {processLoad ? <BeatLoader loading={processLoad} size={10} color='white' /> : "Pay Now"}
                                    </button>
                                </div>
                            </form>
                        }

                    </> : <p className='text-center text-2xl'>No Item to complete payment.</p>}
                </div>
            </div>
        </div>
    );
}

export default PaymentForm;
