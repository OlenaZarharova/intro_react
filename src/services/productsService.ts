import httpClient from "../httpClient";
import Product from "../models/Product";

const BASE_PATH = "/products";

const productsService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await httpClient.get(BASE_PATH);
    return response.data;
  },

  getProduct: async (productId: string): Promise<Product> => {
    const response = await httpClient.get(`${BASE_PATH}/${productId}`);
    return response.data;
  },

  createProduct: async (product: Product): Promise<Product> => {
    const response = await httpClient.post(BASE_PATH, product);
    return response.data;
  },

  updateProduct: async (product: Product): Promise<Product> => {
    const response = await httpClient.put(
      `${BASE_PATH}/${product.id}`,
      product
    );
    return response.data;
  },

  deleteProduct: async (productId: string): Promise<void> => {
    await httpClient.delete(`${BASE_PATH}/${productId}`);
  },
};

export default productsService;
