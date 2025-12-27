import { axiosClient } from './axiosClient';

export const categoriesApi = {
  getAll: () => axiosClient.get('/products/categories'),
};
