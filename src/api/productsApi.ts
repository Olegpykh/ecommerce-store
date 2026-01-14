// import { axiosClient } from "./axiosClient";

// export const productsApi = {
//   getAll: () => axiosClient.get('/products'),
//   getOne: (id: number) => axiosClient.get(`/products/${id}`),
//   getByCategory: (slug: string) => axiosClient.get(`/products/category/${slug}`),
// };


import { axiosClient } from "./axiosClient";

export const productsApi = {
  getAll: (skip: number = 0) =>
    axiosClient.get(`/products?limit=20&skip=${skip}`),

  getOne: (id: number) => axiosClient.get(`/products/${id}`),

  getByCategory: (slug: string) =>
    axiosClient.get(`/products/category/${slug}`),
};
