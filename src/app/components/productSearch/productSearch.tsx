'use client'

import { useEffect, useState } from "react";
import { ProductSearchContainer } from "./styles"
import {useSearchContext} from "@/context/SearchContext";
import { ProductResponse } from "@/types/product-types";
import { GetProductByName } from "@/app/api/actions/products";
import ProductView from "../productsView/productsView";


export default function ProductSearch() {
    
    const { searchQuery } = useSearchContext();
    const [products, setProducts] = useState<ProductResponse[]>([]);

    
    useEffect(() => {
 
        fetchProducts();
    }, [searchQuery.query]);


    const fetchProducts = async () => {
        if (searchQuery.query != null && searchQuery.query.length > 0) {
            const productsByName = await GetProductByName(searchQuery.query);
            setProducts(productsByName);
        
        }
        
    };


    return (
        <>       
            {
                (searchQuery.query != null && searchQuery.query.length > 0) &&

                <ProductSearchContainer>
                    <h1>Busca por: {searchQuery.query}</h1>
                        <div className="products_list">
                            {
                                (products != null && products.length > 0) && products.map((prod) => {
                                    return (
                                        <ProductView key={prod.id} product = {prod}/>
                                    )
                                })
                            }
                        </div>
                </ProductSearchContainer>

            }
        </>

   

    )




}