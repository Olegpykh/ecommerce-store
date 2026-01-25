import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { Link } from 'react-router-dom';

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from '../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items } = useSelector((state: RootState) => state.cart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container px-4 py-20 mx-auto text-center">
        <h1 className="mb-6 text-4xl font-bold">Your cart is empty</h1>
        <p className="text-lg text-gray-600">
          Add some products to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 py-10 dark:bg-black ">
      <h1 className="mt-12 mb-10 text-4xl font-bold text-center dark:text-white">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-6 transition bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-lg hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-32 h-32 overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
                  <p className="text-lg text-gray-600">€{item.price}</p>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="flex items-center justify-center w-8 h-8 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="flex items-center justify-center w-8 h-8 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="ml-auto text-xl text-pink-400 transition hover:text-pink-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky p-8 bg-white border border-gray-200 shadow-lg rounded-2xl h-fit top-10">
          <h2 className="mb-6 text-2xl font-semibold">Order Summary</h2>

          <div className="flex justify-between mb-4 text-lg">
            <span>Subtotal:</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4 text-lg">
            <span>Shipping:</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="flex justify-between pt-4 text-xl font-bold border-t">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="block w-full py-4 mt-8 text-lg font-medium text-center text-white transition bg-black shadow-md rounded-xl hover:bg-gray-900 dark:hover:bg-pink-500"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
