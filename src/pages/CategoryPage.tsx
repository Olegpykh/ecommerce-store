import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { fetchProductsByCategory } from '../features/products';
import { fetchCategories } from '../features/categories';
import ProductCard from '../components/ProductCard';
import FiltersBar from '../components/FiltersBar';

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string }>();
  const [addedId, setAddedId] = useState<number | null>(null);

  const { productsItems, categoryProductsStatus, categoryProductsError } =
    useSelector((state: RootState) => state.products);
  console.log(productsItems);

  const { categoriesItems } = useSelector(
    (state: RootState) => state.categories
  );

  const [sort, setSort] = useState('newest');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);

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
    <div className="px-4 py-24 mx-auto dark:bg-black dark:text-white">
      <h1 className="py-10 text-4xl font-bold text-center ">
        {categoryName}
      </h1>
      <FiltersBar
        sort={sort}
        setSort={setSort}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        brands={brands}
      />

      {isLoading && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 shadow-inner h-80 rounded-xl"
            ></div>
          ))}
        </div>
      )}

      {hasError && (
        <p className="text-xl text-center text-red-500">
          Error: {categoryProductsError}
        </p>
      )}

      {!isLoading && !hasError && filteredProducts.length === 0 && (
        <p className="text-xl text-center">No products found</p>
      )}

      {!isLoading && !hasError && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-8 px-14 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fadeIn dark:bg-black dark:text-black">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addedId={addedId}
              setAddedId={setAddedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
