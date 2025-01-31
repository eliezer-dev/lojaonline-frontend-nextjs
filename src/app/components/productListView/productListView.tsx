'use client'

import { ProductSection } from "./styles";
import {useSearchContext} from "@/context/SearchContext";
import ProductView from "../productsView/productsView";
import {ProductGroupByCategoryResponse} from "@/types/productGroupByCategoryResponse-types";


interface ProductListViewProps {
    productsGroupByCategories: ProductGroupByCategoryResponse[];
    
}

export default function ProductListView({productsGroupByCategories
}: ProductListViewProps) {
  const { searchQuery } = useSearchContext();

  return (
        <>
            {
              
                (searchQuery.query !== null && searchQuery.query.length == 0) && 
                <>
                    {
                        productsGroupByCategories && 
                        productsGroupByCategories.map((prodGroupCategory, index) => {
                            return(
                                <ProductSection key={index}>
                                    <h1>{prodGroupCategory.description}</h1>
                                    <div className="products_list">
                                        {
                                            prodGroupCategory.products 
                                            && prodGroupCategory.products.map((prod) => {
                                                return (
                                                        <ProductView  
                                                            key={prod.id} 
                                                            product={prod}
                                                        />
                                                )
                                            })
                                        }
                                    </div>
                                </ProductSection>
                            )
                        })
                    }
                </>
            }
        </>
  )
}
