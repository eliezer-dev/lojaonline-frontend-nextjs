import { ImageProps } from './image-types';

export interface ProductResponse {
    id: number,
    name: string,
    description?:string,
    sku: string,
    price: number,
    stock_quantity: number,
    weight: number,
    createAt: Date,
    updateAt: Date,
    active: boolean,
    images: ImageProps[],
    productType: string,
    compositeItems: []
}