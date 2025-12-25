import { axiosClient } from './axiosClient';
export const productsApi = {
  getAll: () => axiosClient.get('/products'),
  getOne: (id: number) => axiosClient.get(`/products/${id}`),
  getByCategory: (categoryId: number) => axiosClient.get(`/categories${categoryId}/products`),
};
