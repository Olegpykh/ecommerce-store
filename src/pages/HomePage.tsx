import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { Link } from 'react-router-dom';

import { fetchProducts, fetchProductsByCategory } from '../features/products';
import { fetchCategories } from '../features/categories';
import { addToCart } from '../features/cart/cartSlice';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { productsItems, productsStatus, productsError } = useSelector(
    (state: RootState) => state.products
  );

  const { categoriesItems, categoriesStatus, categoriesError } = useSelector(
    (state: RootState) => state.categories
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [addedId, setAddedId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory === null) {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
  };

  const isLoading =
    productsStatus === 'loading' || categoriesStatus === 'loading';

  const hasError = productsStatus === 'failed' || categoriesStatus === 'failed';

  return (
    <div className="home-page container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Store</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Categories</h2>

        {categoriesStatus === 'loading' && <p>Loading categories...</p>}
        {categoriesError && <p className="text-red-500">{categoriesError}</p>}

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            All products
          </button>

          {categoriesItems.slice(0, 12).map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedCategory === category.slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">
          {selectedCategory === null
            ? 'All products'
            : categoriesItems.find((c) => c.slug === selectedCategory)?.name ||
              'Products'}
        </h2>

        {isLoading && (
          <div className="text-center py-20">
            <p className="text-xl">Loading products...</p>
          </div>
        )}

        {hasError && (
          <div className="text-center py-20 text-red-500">
            <p>Error: {productsError || categoriesError}</p>
          </div>
        )}

        {!isLoading && !hasError && productsItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl">No products found</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productsItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-700 text-2xl font-bold mb-4">
                    €{product.price}
                  </p>
                </div>
              </Link>

              <div className="px-4 pb-4">
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        thumbnail: product.thumbnail,
                      })
                    );

                    setAddedId(product.id);
                    setTimeout(() => setAddedId(null), 1500);
                  }}
                  className={`
                    w-full py-2 rounded font-medium transition
                    ${
                      addedId === product.id
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }
                  `}
                >
                  {addedId === product.id ? 'Added!' : 'Add to cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
