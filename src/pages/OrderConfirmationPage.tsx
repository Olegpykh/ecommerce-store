import { Link } from 'react-router-dom';
import { useState } from 'react';

const OrderConfirmationPage = () => {
const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  return (
    <div className="min-h-screen px-10 py-24 mx-auto text-center dark:bg-black">
      <div className="max-w-xl p-10 mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl">
        <h1 className="mb-6 text-4xl font-bold text-pink-500">
          Thank you for your order!
        </h1>

        <p className="mb-4 text-lg text-gray-700">
          Your order has been successfully placed.
        </p>

        <p className="mb-8 text-gray-600">
          Order number: <span className="font-semibold">#{orderId}</span>
        </p>

        <img src="/success.gif" alt="Success" className="w-40 mx-auto mb-8" />

        <Link
          to="/"
          className="inline-block px-8 py-3 text-lg font-medium text-white transition bg-pink-500 rounded-full hover:bg-pink-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
