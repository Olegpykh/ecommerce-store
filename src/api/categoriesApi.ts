import { axiosClient } from './axiosClient';
export const categoriesApi = {
  getAll: () => axiosClient.get('/categories'),
  getOne: (id: number) => axiosClient.get(`/categories/${id}`),
};
