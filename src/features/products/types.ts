export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;

  thumbnail: string;
  images: string[];

  tags?: string[];
  availabilityStatus?: string;
  returnPolicy?: string;
  shippingInformation?: string;
  sku?: string;
  weight?: number;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
}

export interface ProductsState {
  productsItems: Product[];
  currentProduct: Product | null;

  productsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  productStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  categoryProductsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';

  productsError: string | null;
  productError: string | null;
  categoryProductsError: string | null;
}
