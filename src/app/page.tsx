import Image from "next/image";
import { HomeContainer, ProductSection } from "./styles";
import api from "@/lib/api";
import ProductView from "./components/productsView";


async function fetchProducts(categoryId:number):Promise<ProductProps[]>  {
  const response = await api.get<ProductProps[]>(`/products?categoryId=${categoryId}`) 
  return response.data
}

async function fetchProductsOtherCategories():Promise<ProductProps[]>  {
	const response = await api.get<ProductProps[]>(`/products?otherCategories=true`) 
	return response.data
  }

async function fetchCategories():Promise<CategoryProps[]>  {
  const response = await api.get<CategoryProps[]>('/products/categories?visibleHome=true') 
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

export interface CategoryProps {
	id: number,
	description: string,
	parentCategoryId: number,
	visibleHome: boolean
}



export default async function Home() {
  let productsCategoryHortifruti:ProductProps[] = []
  let productsCategoryBiscoitosCereais:ProductProps[] = []
  let productsCategoryLeitesVegetais:ProductProps[] = []
  let productsCategoryOtherProducts:ProductProps[] = []
  let categories:CategoryProps[] = []

  try {
	//categories = await fetchCategories()
	productsCategoryHortifruti = await fetchProducts(1)
	productsCategoryBiscoitosCereais = await fetchProducts(2)
	productsCategoryLeitesVegetais = await fetchProducts(3)
	productsCategoryOtherProducts = await fetchProductsOtherCategories()
  } catch (error) {
	throw new Error('Erro ao buscar produtos')
  }

  return (
    <HomeContainer>
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


    </HomeContainer>
  );
}
