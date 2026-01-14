import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import HeroBanner from '../components/HeroBanner';
import CategoriesSection from '../components/CategoriesSection/CategoriesSection';
import LoadingState from '../components/states/LoadingState';
import ErrorState from '../components/states/ErrorState';
import EmptyState from '../components/states/EmptyState';
import ProductsGrid from '../components/ProductsGrid';
import { SectionTitle } from '../components/SectionTitle';
import { LoadMoreButton } from '../components/LoadMoreButton';

import {
  fetchProducts,
  fetchProductsByCategory,
  loadMoreProducts,
} from '../features/products';

import { fetchCategories } from '../features/categories';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    productsItems,
    productsStatus,
    productsError,
    categoryProductsStatus,
  } = useSelector((state: RootState) => state.products);
  console.log(productsItems);

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

  const isLoading =
    productsStatus === 'loading' || categoriesStatus === 'loading';

  const hasError =
    productsStatus === 'failed' ||
    categoriesStatus === 'failed' ||
    categoryProductsStatus === 'failed';

  const sectionTitle =
    selectedCategory === null
      ? 'Highlights'
      : categoriesItems.find((c) => c.slug === selectedCategory)?.name ||
        'Products';

  return (
    <>
      <div className="mt-16">
        <HeroBanner />
      </div>
      <div className="px-16 py-8 mx-auto ">
        <CategoriesSection
          categories={categoriesItems}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          status={categoriesStatus}
          error={categoriesError}
        />

        <div>
          <SectionTitle title={sectionTitle} />

          {isLoading && <LoadingState message="Loading products..." />}

          {hasError && (
            <ErrorState message={productsError || categoriesError || 'Error'} />
          )}

          {!isLoading && !hasError && productsItems.length === 0 && (
            <EmptyState message="No products found" />
          )}
          <ProductsGrid
            products={productsItems}
            addedId={addedId}
            setAddedId={setAddedId}
          />

          {selectedCategory === null && (
            <LoadMoreButton onClick={() => dispatch(loadMoreProducts())} />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
