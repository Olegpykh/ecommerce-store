import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchCategories } from '../features/categories';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categoriesItems, categoriesStatus, categoriesError } = useSelector(
    (state: RootState) => state.categories
  );

  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoriesItems.length === 0) return;

    const loadImages = async () => {
      const promises = categoriesItems.map(async (cat) => {
        try {
          const res = await fetch(
            `https://dummyjson.com/products/category/${cat.slug}`
          );
          const data = await res.json();

          return {
            slug: cat.slug,
            thumbnail:
              data.products?.[0]?.thumbnail ||
              'https://via.placeholder.com/300x200?text=No+Image',
          };
        } catch {
          return {
            slug: cat.slug,
            thumbnail: 'https://via.placeholder.com/300x200?text=No+Image',
          };
        }
      });

      const results = await Promise.all(promises);

      const imagesMap: Record<string, string> = {};
      results.forEach((item) => {
        imagesMap[item.slug] = item.thumbnail;
      });

      setCategoryImages(imagesMap);
    };

    loadImages();
  }, [categoriesItems]);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Categories</h1>

      {categoriesStatus === 'loading' && (
        <p className="text-center text-xl">Loading categories...</p>
      )}

      {categoriesError && (
        <p className="text-center text-red-500 text-xl">{categoriesError}</p>
      )}

      {categoriesStatus === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categoriesItems.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                <img
                  src={categoryImages[category.slug]}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>

              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold mb-1">{category.name}</h2>
                <p className="text-gray-500 text-sm">{category.slug}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
