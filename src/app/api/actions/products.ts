import api from "@/lib/api";
import { ProductResponse } from "@/types/product-types";

export const GetProductByName = async (name: string) => {
    const response = await api.get<ProductResponse[]>(`/products?name=${name}`);
    return response.data;

}

export const GetProductByCategory = async (categoryId: number) => {
    const response = await api.get<ProductResponse[]>(`/products?categoryId=${categoryId}`);
    return response.data;

}

export const GetProductByOtherCategories = async () => {
    const response = await api.get<ProductResponse[]>(`/products?otherCategories=true`);
    return response.data;
}