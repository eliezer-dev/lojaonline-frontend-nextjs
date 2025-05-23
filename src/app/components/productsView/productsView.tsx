'use client'

import Image from "next/image";
import { ProductViewContainer } from "./styles";
import { useEffect, useState } from "react";
import imageNotFound from "@/assets/imageNotFound.png";
import { formatToBRL } from "@/util/geral";
import Button from "@/ui/button/button";
import { CiShoppingCart } from "react-icons/ci";
import {ProductResponse} from "@/types/product-types";
import {GetProductByName} from "@/app/api/actions/products";
import {CreateOrder} from "@/app/api/actions/order";
import {OrderRequest, OrderRequestInstallment, OrderRequestItem} from "@/types/order-types";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";

export default function ProductView({product}:{product: ProductResponse}) {
    const [productState, setProductState] = useState<ProductResponse>()
     const {isCartActive, handleCartDetails, addProductToCart} = useData();
    const router = useRouter();

  useEffect(() => {

    if (product != null) {
        setProductState(product)
    }

}, [product]);

   

    function handleAddProductToCart () {
        if (productState != null) {
            addProductToCart(productState)
            handleCartDetails(true)
        }

       
    }

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
        <Button title={'Adicionar'} icon={CiShoppingCart} onClick={handleAddProductToCart}/>

      </ProductViewContainer>
    }
  </>
  )
}
