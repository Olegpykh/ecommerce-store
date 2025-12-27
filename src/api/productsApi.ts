import { axiosClient } from "./axiosClient";

export const productsApi = {
  getAll: () => axiosClient.get('/products'),
  getOne: (id: number) => axiosClient.get(`/products/${id}`),
  getByCategory: (slug: string) => axiosClient.get(`/products/category/${slug}`),
};

