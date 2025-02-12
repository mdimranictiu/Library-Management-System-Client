import React, { useState } from 'react';
import Lottie from 'lottie-react';
import helpAnimation from '../../assets/help.json'; 

const HelpCenter = () => {
  document.title = "Help Center";
  
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I borrow a book?",
      answer: "To borrow a book, log in to your account, navigate to the book details page you want to borrow, and click 'Borrow'.",
    },
    {
      question: "How can I contact the library?",
      answer: "You can contact the library through our 'Contact Us' form or by reaching out to our support email: support@lbmsltd.com",
    },
    {
      question: "What happens if I return a book late?",
      answer: "Late returns may incur a fine depending on the library's policy. Please refer to the 'Terms & Conditions' section for further details.",
    },
    {
      question: "Can I suggest a book for the library?",
      answer: "Yes, you can suggest a book through the 'Suggest a Book' feature available in Library Services Section. ",
    },
  ];

  return (
    <div className="py-20 px-5 max-w-3xl mx-auto">
      <h2 className="text-3xl py-5 font-bold text-center text-[#008575] mb-6">Help Center and FAQs</h2>

      {/* Lottie Animation */}
      <div className="flex justify-center mb-8">
        <Lottie animationData={helpAnimation} loop={true} style={{ width: 300, height: 300 }} />
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <div
              className="cursor-pointer text-[#008575] text-lg font-semibold"
              onClick={() => toggleQuestion(index)}
            >
              {faq.question}
            </div>
            {activeQuestion === index && (
              <div className="mt-2 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Us */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl text-[#008575] font-semibold mb-4">Need More Help?</h3>
        <p>If you have further questions or need support, feel free to contact us:</p>
        <ul className="mt-2">
          <li className="text-black font-semibold">Email: support@lbmsltd.com
          </li>
          <li className="text-black font-semibold">Phone: +880123123123</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpCenter;
