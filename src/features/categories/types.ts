export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoriesState {
  categoryItems: Category[];
  currentCategory: Category | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
