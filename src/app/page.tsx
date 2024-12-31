import Image from "next/image";
import { HomeContainer, HortaSection } from "./styles";
import api from "@/lib/api";
import ProductView from "./components/productsView";


async function fetchProducts():Promise<ProductProps[]>  {
  const response = await api.get<ProductProps[]>('/products') 
  console.log(response.data)
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
	images: [],
	productType: string,
	compositeItems: []
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
			{
				products && products.map((prod) => {
					return (
						<ProductView key={prod.id} product = {prod}/>
					)
				})
			}
		</HortaSection>
      <h1>Pagina home</h1>
    </HomeContainer>
  );
}
