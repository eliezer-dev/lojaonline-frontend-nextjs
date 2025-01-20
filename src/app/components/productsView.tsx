'use client'

import Image from "next/image";
import { ProductViewContainer } from "./styles";
import api from "@/lib/api";
import { ProductProps } from "../page";
import { useEffect, useState } from "react";
import imageNotFound from "@/assets/imageNotFound.png";
import { formatToBRL } from "@/util/geral";
import Button from "@/ui/button/button";
import { CiShoppingCart } from "react-icons/ci";

export default function ProductView({product}:{product: ProductProps}) {
  const [productState, setProductState] = useState<ProductProps>()
//   const { addProductToCart, handleCartDetails } = useData();

  useEffect(() => {

    if (product != null) {
        setProductState(product)
    }

}, [product]);

  return (
  <>
  
    {
      productState && 
      <ProductViewContainer>
        
        <div className='product_image_description'>
          {
            productState.images.length > 0 ?  
            <Image src={productState.images[0].link} width={100} height={100} alt="" priority={true}/> :
            <Image src={imageNotFound} width={100} height={100} alt="" priority={true}/>
          }

          <p className="product_description">{productState?.name}</p>
        </div>
        <p className="product_price">{productState && formatToBRL(productState.price)}</p>
        <Button title={'Adicionar'} icon={CiShoppingCart}/>

      </ProductViewContainer>
    }
  </>
  )
}
