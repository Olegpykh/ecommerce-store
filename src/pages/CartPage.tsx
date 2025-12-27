import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

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
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Your cart is empty</h1>
        <p className="text-gray-600 text-lg">
          Add some products to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                flex gap-6 bg-white rounded-2xl shadow-md p-6 
                border border-gray-200 transition hover:shadow-lg
              "
            >
              <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-600 text-lg">€{item.price}</p>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="
                      w-8 h-8 flex items-center justify-center 
                      bg-gray-200 rounded-lg hover:bg-gray-300 transition
                    "
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="
                      w-8 h-8 flex items-center justify-center 
                      bg-gray-200 rounded-lg hover:bg-gray-300 transition
                    "
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="ml-auto text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="
            bg-white rounded-2xl shadow-lg p-8 border border-gray-200 
            h-fit sticky top-10
          "
        >
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="flex justify-between text-lg mb-4">
            <span>Subtotal:</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg mb-4">
            <span>Shipping:</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <button
            className="
              w-full bg-black text-white py-4 rounded-xl text-lg font-medium 
              hover:bg-gray-900 transition mt-8 shadow-md
            "
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
