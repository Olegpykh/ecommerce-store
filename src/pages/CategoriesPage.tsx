import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchCategories } from '../features/categories';
import HeroBanner from '../components/HeroBanner';
import { CategoryCard } from '../components/CategoryCard';
import { useCategoryImages } from '../hooks/useCategoryImages';

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categoriesItems, categoriesStatus, categoriesError } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryImages = useCategoryImages(categoriesItems);

  return (
    <>
      <div className="mt-16 ">
        <HeroBanner />
      </div>

      <div className="px-12 mx-auto dark:bg-black/90 dark:text-black">
        <h1 className="py-10 mb-10 text-4xl font-bold text-center dark:text-white">Categories</h1>

        {categoriesStatus === 'loading' && (
          <p className="text-xl text-center">Loading categories...</p>
        )}

        {categoriesError && (
          <p className="text-xl text-center text-red-500">{categoriesError}</p>
        )}

        {categoriesStatus === 'succeeded' && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesItems.map((category) => (
              <CategoryCard
                key={category.slug}
                name={category.name}
                slug={category.slug}
                image={categoryImages[category.slug]}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
