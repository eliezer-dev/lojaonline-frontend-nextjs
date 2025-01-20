'use client'

import Image from "next/image";
import { ProductSection } from "./styles";
import { useEffect, useState } from "react";
import {useData} from "@/context/SearchContext";
import ProductView from "../productsView";
import { ProductResponse } from "@/types/product-types";


interface ProductListViewProps {
    productsCategoryHortifruti: ProductResponse[];
    productsCategoryBiscoitosCereais: ProductResponse[];
    productsCategoryLeitesVegetais: ProductResponse[];
    productsCategoryOtherProducts: ProductResponse[];
}

export default function ProductListView({
    productsCategoryHortifruti,
    productsCategoryBiscoitosCereais,
    productsCategoryLeitesVegetais,
    productsCategoryOtherProducts
}: ProductListViewProps) {
  const [productState, setProductState] = useState<ProductResponse>()
  const { searchQuery } = useData();
//   const { addProductToCart, handleCartDetails } = useData();
    
    useEffect(() => {
    }, [productsCategoryHortifruti, productsCategoryBiscoitosCereais, productsCategoryLeitesVegetais, productsCategoryOtherProducts]);

  return (
        <>
            {
              
                (searchQuery.query !== null && searchQuery.query.length == 0) && 
                <>  
                        <ProductSection>
                            <h1>Hortifruti</h1>
                            <div className="products_list">
                                {
                                    productsCategoryHortifruti && productsCategoryHortifruti.map((prod) => {
                                        return (
                                            <ProductView key={prod.id} product = {prod}/>
                                        )
                                    })
                                }
                            </div>
                        </ProductSection>

                        <ProductSection>
                            <h1>Biscoitos e Cereias Sem Glútem e Sem Lactose</h1>
                            <div className="products_list">
                                {
                                    productsCategoryBiscoitosCereais && productsCategoryBiscoitosCereais.map((prod) => {
                                        return (
                                            <ProductView key={prod.id} product = {prod}/>
                                        )
                                    })
                                }
                            </div>
                        </ProductSection>

                        <ProductSection>
                            <h1>Leites Vegetais</h1>
                            <div className="products_list">
                                {
                                    productsCategoryLeitesVegetais && productsCategoryLeitesVegetais.map((prod) => {
                                        return (
                                            <ProductView key={prod.id} product = {prod}/>
                                        )
                                    })
                                }
                            </div>
                        </ProductSection>

                        <ProductSection>
                            <h1>Outros Produtos S/Glutém e Sem Lactose</h1>
                            <div className="products_list">
                                {
                                    productsCategoryOtherProducts && productsCategoryOtherProducts.map((prod) => {
                                        return (
                                            <ProductView key={prod.id} product = {prod}/>
                                        )
                                    })
                                }
                            </div>
                        </ProductSection>
                </>
            }
        </>
  )
}
