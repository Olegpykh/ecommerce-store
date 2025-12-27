import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';

import { fetchProductsByCategory } from '../features/products';
import { fetchCategories } from '../features/categories';

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string }>();

  const { productsItems, categoryProductsStatus, categoryProductsError } =
    useSelector((state: RootState) => state.products);

  const { categoriesItems } = useSelector(
    (state: RootState) => state.categories
  );

  const [sort, setSort] = useState('newest');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductsByCategory(slug));
    }
  }, [slug, dispatch]);

  const categoryName =
    categoriesItems.find((c) => c.slug === slug)?.name || 'Category';

  const isLoading = categoryProductsStatus === 'loading';
  const hasError = categoryProductsStatus === 'failed';

  const brands = useMemo(() => {
    const set = new Set(productsItems.map((p) => p.brand));
    return ['all', ...Array.from(set)];
  }, [productsItems]);

  const filteredProducts = useMemo(() => {
    let items = [...productsItems];

    if (brandFilter !== 'all') {
      items = items.filter((p) => p.brand === brandFilter);
    }

    items = items.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
    if (sort === 'newest') items.sort((a, b) => b.id - a.id);

    return items;
  }, [productsItems, sort, brandFilter, priceRange]);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">{categoryName}</h1>

      <div className="flex flex-wrap gap-6 mb-10 justify-center">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-4 py-2 shadow-sm"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>

        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 shadow-sm"
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b === 'all' ? 'All brands' : b}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3">
          <span>€{priceRange[0]}</span>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
          <span>€{priceRange[1]}</span>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 h-80 rounded-xl shadow-inner"
            ></div>
          ))}
        </div>
      )}

      {hasError && (
        <p className="text-center text-red-500 text-xl">
          Error: {categoryProductsError}
        </p>
      )}

      {!isLoading && !hasError && filteredProducts.length === 0 && (
        <p className="text-center text-xl">No products found</p>
      )}

      {!isLoading && !hasError && filteredProducts.length > 0 && (
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 
            animate-fadeIn
          "
        >
          {filteredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="
                bg-white rounded-xl shadow-md overflow-hidden 
                hover:shadow-xl hover:scale-[1.02] 
                transition-all duration-300
              "
            >
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

                <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
                  Add to cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
