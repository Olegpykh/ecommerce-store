import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';

import { fetchProductById } from '../features/products';

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { currentProduct, productStatus, productError } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previousImage, setPreviousImage] = useState<string | null>(null);

  const mainImage = selectedImage ?? currentProduct?.thumbnail ?? '';

  const isLoading = productStatus === 'loading';
  const hasError = productStatus === 'failed';

  return (
    <div className="container mx-auto py-10 px-4">
      {isLoading && <p className="text-center text-xl">Loading product...</p>}

      {hasError && (
        <p className="text-center text-red-500 text-xl">
          Error: {productError}
        </p>
      )}

      {!isLoading && !hasError && currentProduct && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="md:sticky md:top-10 flex flex-col items-center">
            <div
              className="
                w-full h-[500px] bg-white rounded-2xl shadow-lg p-6 
                flex items-center justify-center 
                border border-gray-200 overflow-hidden relative
              "
            >
              <img
                src={mainImage}
                alt={currentProduct.title}
                className="
                  max-h-full max-w-full object-contain w-full h-full
                  transition-opacity duration-500 ease-in-out
                  opacity-100 animate-fadeIn
                "
                onError={(e) => {
                  e.currentTarget.src =
                    'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />

              {previousImage && previousImage !== mainImage && (
                <img
                  src={previousImage}
                  alt="previous"
                  className="
                    absolute inset-0 max-h-full max-w-full object-contain w-full h-full
                    opacity-0 animate-fadeOut pointer-events-none
                  "
                />
              )}
            </div>

            <div className="flex gap-4 mt-6 overflow-x-auto">
              {[currentProduct.thumbnail, ...currentProduct.images].map(
                (img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPreviousImage(mainImage);
                      setSelectedImage(img);
                    }}
                    className={`
                      border rounded-xl p-1 transition 
                      ${
                        mainImage === img
                          ? 'border-black shadow-md'
                          : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-lg">
                      <img
                        src={img}
                        alt={`${currentProduct.title} ${index}`}
                        className="
                          w-full h-full object-contain 
                          transition-transform duration-300 
                          hover:scale-110
                        "
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://via.placeholder.com/100x100?text=No+Image';
                        }}
                      />
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-semibold mb-6 text-gray-900">
              {currentProduct.title}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {currentProduct.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <p className="text-5xl font-bold text-gray-900">
                €{currentProduct.price}
              </p>

              {currentProduct.discountPercentage > 0 && (
                <span className="text-red-500 text-xl font-semibold">
                  -{currentProduct.discountPercentage}%
                </span>
              )}
            </div>

            <div className="space-y-2 mb-10 text-lg text-gray-700">
              <p>
                <span className="font-semibold">Brand:</span>{' '}
                {currentProduct.brand}
              </p>
              <p>
                <span className="font-semibold">Category:</span>{' '}
                {currentProduct.category}
              </p>
              <p>
                <span className="font-semibold">Rating:</span>{' '}
                {currentProduct.rating} ⭐
              </p>
              <p>
                <span className="font-semibold">Stock:</span>{' '}
                {currentProduct.stock > 0
                  ? `${currentProduct.stock} pcs`
                  : 'Out of stock'}
              </p>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-xl text-lg font-medium hover:bg-gray-900 transition shadow-md">
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
