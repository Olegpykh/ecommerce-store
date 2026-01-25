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
          // Добавляем фоновый цвет для всей страницы и цвет текста по умолчанию
          <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-black/90 dark:text-black">
            {/* Контейнер для HeroBanner (если ему нужен отступ) */}
            <div className="mt-16">
              <HeroBanner />
            </div>

            {/* Основной контент */}
            <div className="px-16 py-20 mx-auto dark:text-white">
              <CategoriesSection
                categories={categoriesItems}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                status={categoriesStatus}
                error={categoriesError}
              />

              <div className="mt-8">
                {/* Секция заголовка */}
                <div className="dark:text-white">
                  <SectionTitle title={sectionTitle} />
                </div>

                {/* Состояния загрузки, ошибки и пустоты */}
                <div className="flex justify-center py-10">
                  {isLoading && (
                    <div className="text-gray-600 dark:text-gray-400">
                      <LoadingState message="Loading products..." />
                    </div>
                  )}

                  {hasError && (
                    <div className="text-red-500 dark:text-red-400">
                      <ErrorState
                        message={productsError || categoriesError || 'Error'}
                      />
                    </div>
                  )}

                  {!isLoading && !hasError && productsItems.length === 0 && (
                    <div className="text-gray-500 dark:text-gray-400">
                      <EmptyState message="No products found" />
                    </div>
                  )}
                </div>

                {/* Сетка товаров */}
                <ProductsGrid
                  products={productsItems}
                  addedId={addedId}
                  setAddedId={setAddedId}
                />

                {/* Кнопка "Загрузить еще" */}
                {selectedCategory === null && productsItems.length > 0 && (
                  <div className="flex justify-center mt-12">
                    <LoadMoreButton
                      onClick={() => dispatch(loadMoreProducts())}
                      className="text-gray-900 transition-colors bg-gray-100 dark:bg-gray-800 dark:text-black hover:bg-gray-200 dark:hover:bg-gray-700"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

  // return (
  //   <>
  //     <div className="mt-16">
  //       <HeroBanner />
  //     </div>
  //     <div className="px-16 py-8 mx-auto">
  //       <CategoriesSection
  //         categories={categoriesItems}
  //         selected={selectedCategory}
  //         onSelect={setSelectedCategory}
  //         status={categoriesStatus}
  //         error={categoriesError}
  //       />

  //       <div>
  //         <SectionTitle title={sectionTitle} />

  //         {isLoading && <LoadingState message="Loading products..." />}

  //         {hasError && (
  //           <ErrorState message={productsError || categoriesError || 'Error'} />
  //         )}

  //         {!isLoading && !hasError && productsItems.length === 0 && (
  //           <EmptyState message="No products found" />
  //         )}
  //         <ProductsGrid
  //           products={productsItems}
  //           addedId={addedId}
  //           setAddedId={setAddedId}
  //         />

  //         {selectedCategory === null && (
  //           <LoadMoreButton onClick={() => dispatch(loadMoreProducts())} />
  //         )}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default HomePage;
