export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

export interface ProductsState {
  productsItems: Product[];
  currentProduct: Product | null;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
