import { api } from "../api";
import type {
    Product,
    ProductCreateDTO,
    ProductUpdateDTO,
} from "../../DTO/ProductDTO";

const BASE_URL = "/api/v1/products";

export const getProducts = async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>(BASE_URL);
    return data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const { data } = await api.get<Product>(`${BASE_URL}/${id}`);
    return data;
};

export const createProduct = async (
    payload: ProductCreateDTO
): Promise<Product> => {
    const { data } = await api.post<Product>(BASE_URL, payload);
    return data;
};

export const updateProduct = async (
    id: number,
    payload: ProductUpdateDTO
): Promise<Product> => {
    const { data } = await api.put<Product>(`${BASE_URL}/${id}`, payload);
    return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
};
