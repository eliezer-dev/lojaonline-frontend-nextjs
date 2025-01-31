"use server"

import Image from "next/image";
import { HomeContainer } from "./styles";
import api from "@/lib/api";
import ProductView from "./components/productsView/productsView";
import { Button , DatePicker} from 'antd';
import { AutoComplete } from "antd";
import InputSearch from "@/ui/inputSearch/inputSearch";
import ProductSearch from "./components/productSearch/productSearch";
import { SearchProvider } from "@/context/SearchContext";
import ProductListView from "./components/productListView/productListView";
import { ProductResponse } from "@/types/product-types";
import {
    GetProductAllCategoryWithProducts
} from "./api/actions/products";
import {ProductGroupByCategoryResponse} from "@/types/productGroupByCategoryResponse-types";


export default async function Home() {
    
  let productsGroupByCategories:ProductGroupByCategoryResponse[] = []
    
  try {
      productsGroupByCategories  = await GetProductAllCategoryWithProducts(true)
	
  } catch (error) {
	throw new Error('Erro ao buscar produtos')
  }



  return (
        <HomeContainer>
            <ProductSearch/>
            <ProductListView
                productsGroupByCategories={productsGroupByCategories}
            />

        </HomeContainer>
  );
}

