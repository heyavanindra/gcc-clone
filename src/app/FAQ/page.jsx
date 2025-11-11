"use client"
import React, { useState } from 'react';

const Page = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Will my money be refunded or will I get a credit voucher?",
      answer: "In case of returns, we will credit the amount you paid for the products in your bank account, in case of a Cash in Delivery order or the account/card amount was paid from, in case of prepaid orders. We are sorry to inform you we do not have exchange available."
    },
    {
      question: "What shipping method does the website use?",
      answer: "We use a large network of courier partners to deliver your products including Blue Dart, Delhivery, and Xpressbees, etc for domestic orders, and DHL for International Orders."
    },
    {
      question: 'Are there any charges for international shipping?',
      answer: "Yes, we levy a minimal shipping fee to deliver goods internationally. Information on the same can be found by following this link - https://ggccomp.in/shipping"
    },
    {
      question: "What are the charges for shipping in India?",
      answer: "Shipping is free for orders above 1500 Rupees. Orders below 1500 Rupees will carry a charge of additional 99 Rupees which is non-refundable."
    },
    {
      question: "How long until my order ships?",
      answer: "We dispatch products from Monday to Friday. Once you place the order, we will aim to dispatch the order in 2-3 working days. Should there be a delay, you will be informed by the Customer care team."
    },
    {
      question: "Do I need to set up an account to place an order?",
      answer: "No! you don't need to setup an account to to place an order, though info regarding shipping and email is needed for the order."
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg pt-36">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Frequently Asked Questions - Golden Ghaf</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left focus:outline-none"
            onClick={() => toggleQuestion(index)}
          >
            <div className="flex justify-between items-center py-4 px-6 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700">{faq.question}</h2>
              <span>{openQuestionIndex === index ? '-' : '+'}</span>
            </div>
          </button>
          {openQuestionIndex === index && (
            <div className="mt-2 px-6 py-4 bg-gray-50 border-l-4 border-blue-500">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold text-gray-700">
          For any enquiries, complaints or concerns email us on <a href="mailto:Care@ggccomp.in" className="text-blue-500">Care@ggccomp.in</a> or call us on <a href="tel:+919930005234" className="text-blue-500">+91 9930005234</a> from Monday to Friday between 9.00 AM - 6.00 PM.
        </p>
      </div>
    </div>
  );
};

export default Page;
