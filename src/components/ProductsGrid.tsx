import ProductCard from './ProductCard';
import { Product } from '../features/products/types';

interface ProductGridProps {
  products: Product[];
  addedId: number | null;
  setAddedId: (id: number | null) => void;
}

const ProductsGrid = ({ products, addedId, setAddedId }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addedId={addedId}
          setAddedId={setAddedId}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
