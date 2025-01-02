import Image from "next/image";
import { HomeContainer, HortaSection } from "./styles";
import api from "@/lib/api";
import ProductView from "./components/productsView";


async function fetchProducts():Promise<ProductProps[]>  {
  const response = await api.get<ProductProps[]>('/products') 
  return response.data
}

export interface ProductProps {
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

export interface ImageProps {
	id: number,
	link: string,
}


export default async function Home() {
  let products:ProductProps[] = []
  
  try {
	products = await fetchProducts()
  } catch (error) {
	throw new Error('Erro ao buscar produtos')
  }

  return (
    <HomeContainer>
		<HortaSection>
			<h1>Hortifruti</h1>
			<div className="products_list">
				{
					products && products.map((prod) => {
						return (
							<ProductView key={prod.id} product = {prod}/>
						)
					})
				}
			</div>
		</HortaSection>

    </HomeContainer>
  );
}
