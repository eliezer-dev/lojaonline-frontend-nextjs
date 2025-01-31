import api from "@/lib/api";
import {ProductResponse} from "@/types/product-types";
import {CategoryResponse} from "@/types/category-types";

export const GetAllCategories = async () => {
    const response = await api.get<CategoryResponse[]>(`/config/header/menu/categories`);
    return response.data;

}