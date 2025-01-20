"use server"

import Image from "next/image";
import { HomeContainer } from "./styles";
import api from "@/lib/api";
import ProductView from "./components/productsView";
import { Button , DatePicker} from 'antd';
import { AutoComplete } from "antd";
import InputSearch from "@/ui/inputSearch/inputSearch";
import ProductSearch from "./components/productSearch/productSearch";
import { SearchProvider } from "@/context/SearchContext";
import ProductListView from "./components/productListView/productListView";
import { ProductResponse } from "@/types/product-types";
import { GetProductByOtherCategories, GetProductByCategory } from "./api/actions/products";


export default async function Home() {

  let productsByName:ProductResponse[] = []
  let productsCategoryHortifruti:ProductResponse[] = []
  let productsCategoryBiscoitosCereais:ProductResponse[] = []
  let productsCategoryLeitesVegetais:ProductResponse[] = []
  let productsCategoryOtherProducts:ProductResponse[] = []



  try {
	//categories = await fetchCategories()
	productsCategoryHortifruti = await GetProductByCategory(1)
	productsCategoryBiscoitosCereais = await GetProductByCategory(2)
	productsCategoryLeitesVegetais = await GetProductByCategory(3)
	productsCategoryOtherProducts = await GetProductByOtherCategories()
  } catch (error) {
	throw new Error('Erro ao buscar produtos')
  }



  return (
    <SearchProvider>
        <HomeContainer>
            <InputSearch/>
            <ProductSearch/>
            <ProductListView 
                productsCategoryHortifruti={productsCategoryHortifruti} 
                productsCategoryBiscoitosCereais={productsCategoryBiscoitosCereais} 
                productsCategoryLeitesVegetais={productsCategoryLeitesVegetais} 
                productsCategoryOtherProducts={productsCategoryOtherProducts} 
            />

        </HomeContainer>
    </SearchProvider>
  );
}

