"use client"
import React, { useState } from 'react';

const Faq = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do i return my order?",
      answer: "If you would like to return your order, please fill out the attached return form that came with the package. Carefully seal the package and attach the shipping label to the package."
    },
    {
      question: "Are there any shipping cost?",
      answer: "For orders under $100 a shipping cost of $9,95 is charged. All orders over $100 will be delivered for free."
    },
    {
      question: "Can I still change my order?",
      answer: "If you want to change your order, please send us an email to Care@ggccomp.in. We will see what is still possible."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12">
      <h1 className="text-2xl mb-6 text-gray-600">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left focus:outline-none"
            onClick={() => toggleQuestion(index)}
          >
            <div className="flex justify-between items-center py-4 border-b">
              <h2 className="text-lg text-gray-600">{faq.question}</h2>
              <span>{openQuestionIndex === index ? '-' : '+'}</span>
            </div>
          </button>
          {openQuestionIndex === index && (
            <div className="mt-2 py-4">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
