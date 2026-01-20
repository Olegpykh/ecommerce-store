import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from '@clerk/clerk-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { user } = useUser();
  const { items } = useSelector((state: RootState) => state.cart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="container px-4 py-20 mx-auto">
          <h1 className="mb-10 text-4xl font-bold text-center">Checkout</h1>

          <div className="max-w-3xl p-8 mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl">
            <h2 className="mb-6 text-2xl font-semibold">Customer</h2>

            <div className="p-4 mb-8 bg-gray-50 rounded-xl">
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {user?.fullName}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Email:</span>{' '}
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            <h2 className="mb-6 text-2xl font-semibold">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 mt-6 text-xl font-bold border-t">
              <span>Total:</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <Link
              to="/order-confirmation"
              className="block w-full py-4 mt-10 text-lg font-medium text-center text-white transition bg-black shadow-md rounded-xl hover:bg-gray-900"
            >
              Place Order
            </Link>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default CheckoutPage;
