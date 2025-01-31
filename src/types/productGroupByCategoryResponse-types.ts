import { ImageProps } from './image-types';
import {ProductResponse} from "@/types/product-types";

export interface ProductGroupByCategoryResponse {
    description:string,
    parentCategoryId: number,
    visibleHome: boolean,
    products: ProductResponse[]
}