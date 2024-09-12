import httpClient from "../httpClient";
import Product from "../models/Product";
import CreateUserRequest from "../models/requests/createUserRequest";
import User from "../models/user";

const BASE_PATH = "/users";

const usersService = {
  getUserProducts: async (userId: number): Promise<Product[]> => {
    const response = await httpClient.get(`${BASE_PATH}/${userId}/products`);
    return response.data;
  },
  createUser: async (user: CreateUserRequest): Promise<User> => {
    const response = await httpClient.post(BASE_PATH, user);
    return response.data;
  },
};

export default usersService;
