export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface CategoriesState {
  categoriesItems: Category[];
  categoriesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  categoriesError: string | null;
}
