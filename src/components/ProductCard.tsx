import { Link } from 'react-router-dom';
import { Product } from '../features/products';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addToCart } from '../features/cart/cartSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useState } from 'react';
type ProductPreview = Pick<Product, 'id' | 'price' | 'title' | 'thumbnail'>;

interface ProductCardProps {
  product: ProductPreview;
  addedId: number | null;
  setAddedId: (id: number | null) => void;
}

const ProductCard = ({ product, addedId, setAddedId }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loaded, setLoaded] = useState<false | true>(false);

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="flex flex-col p-4 font-medium transition-all bg-white rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-2">
      <Link className="flex flex-col flex-1" to={`/products/${product.id}`}>
        <div className="relative w-full h-64">
          {!loaded && (
            <Skeleton
              className="absolute inset-0 "
              height="100%"
              width="100%"
            />
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-contain w-full h-64"
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/300x300?text=No+Image';
              setLoaded(true);
            }}
          />
        </div>
        <div className="flex flex-col flex-1 p-4 mt-auto text-xl">
          <h3 className="line-clamp-2">{product.title}</h3>
          <p>{product.price}</p>
        </div>
      </Link>

      <div className="p-4">
        <button
          onClick={handleAdd}
          className={`w-full py-2 text-xl border-2 rounded-xl border-gray-400 transition-colors
        ${
          addedId === product.id
            ? 'bg-pink-400 text-white'
            : 'bg-white hover:bg-pink-400'
        }`}
        >
          {addedId === product.id ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
