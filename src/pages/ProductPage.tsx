import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { fetchProductById } from '../features/products';
import { addToCart } from '../features/cart/cartSlice';
import ReviewsSection from '../components/ReviewsSection';

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { currentProduct, productStatus, productError } = useSelector(
    (state: RootState) => state.products
  );
  console.log(currentProduct);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const mainImage = selectedImage || currentProduct?.thumbnail || '';

  const isLoading = productStatus === 'loading';
  const hasError = productStatus === 'failed';

  const oldPrice =
    currentProduct && currentProduct.discountPercentage > 0
      ? (
          currentProduct.price /
          (1 - currentProduct.discountPercentage / 100)
        ).toFixed(2)
      : null;

  return (
    <div className="px-10 py-10 mx-auto dark:bg-black/90 dark:text-white">
      {isLoading && <p className="text-xl text-center">Loading product...</p>}

      {hasError && (
        <p className="text-xl text-center text-red-500">
          Error: {productError}
        </p>
      )}

      {!isLoading && !hasError && currentProduct && (
        <>
          <div className="grid grid-cols-1 gap-16 mt-20 md:grid-cols-2">
            <div className="flex flex-col items-center md:sticky md:top-10">
              <div
                className="
                  w-full h-[500px] bg-white rounded-2xl shadow-xl p-6 
                  flex items-center justify-center 
                  border border-gray-400 overflow-hidden relative
                "
              >
                <img
                  src={mainImage}
                  alt={currentProduct.title}
                  className="object-contain w-full h-full max-w-full max-h-full"
                />
              </div>

              <div className="flex gap-4 mt-6 overflow-x-auto">
                {[currentProduct.thumbnail, ...currentProduct.images].map(
                  (img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(img);
                      }}
                      className={`
                        border rounded-xl p-1 transition 
                        ${
                          mainImage === img
                            ? 'border-black shadow-lg'
                            : 'border-gray-300 hover:border-gray-400 shadow-md'
                        }
                      `}
                    >
                      <div className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg">
                        <img
                          src={img}
                          alt={`${currentProduct.title} ${index}`}
                          className="object-contain w-full h-full transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center dark:text-white">
              <h1 className="mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                {currentProduct.title}
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-white">
                {currentProduct.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <p className="text-5xl font-bold text-gray-900 dark:text-white">
                  €{currentProduct.price}
                </p>

                {oldPrice && (
                  <p className="text-2xl text-gray-500 line-through dark:text-white">
                    €{oldPrice}
                  </p>
                )}

                {currentProduct.discountPercentage > 0 && (
                  <span className="text-xl font-semibold text-red-500 ">
                    -{currentProduct.discountPercentage}%
                  </span>
                )}
              </div>

              <div className="mb-10 space-y-2 text-lg text-gray-700 dark:text-white">
                <p>
                  <span className="font-semibold dark:text-white">Brand:</span>{' '}
                  {currentProduct.brand}
                </p>
                <p>
                  <span className="font-semibold dark:text-white">
                    Category:
                  </span>{' '}
                  {currentProduct.category}
                </p>
                <p>
                  <span className="font-semibold dark:text-white">Rating:</span>{' '}
                  {currentProduct.rating}
                </p>
                <p>
                  <span className="font-semibold dark:text-white">Stock:</span>{' '}
                  {currentProduct.stock > 0
                    ? `${currentProduct.stock} pcs`
                    : 'Out of stock'}
                </p>
              </div>

              <button
                onClick={() => {
                  dispatch(addToCart(currentProduct));
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                className={`
                  w-full py-4 text-lg font-medium rounded-xl transition shadow-md dark:text-white
                  ${
                    added
                      ? 'bg-pink-400 hover:bg-pink-600 text-white '
                      : 'bg-black hover:bg-gray-900 text-white dark:hover:bg-pink-500 dark:bg-white dark:text-black'
                  }
                `}
              >
                {added ? 'Added!' : 'Add to cart'}
              </button>
            </div>
          </div>

          <ReviewsSection reviews={currentProduct.reviews} />
        </>
      )}
    </div>
  );
};

export default ProductPage;
