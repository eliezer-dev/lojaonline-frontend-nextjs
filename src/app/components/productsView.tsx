'use client'

import Image from "next/image";
import { ProductViewContainer } from "./styles";
import api from "@/lib/api";
import { ProductProps } from "../page";
import { useEffect, useState } from "react";
import alface from "@/assets/alface.svg";


export default function ProductView({product}:{product: ProductProps}) {
  const [productsState, setProductState] = useState<ProductProps>()
  
  useEffect(() => {

    if (product != null) {
        setProductState(product)
    }

}, [product]);

  return (
    <ProductViewContainer>
      {/*<Image src={alface} width={400} alt="" priority={true}/>*/}
      <p>{productsState?.name}</p>
      <p>{productsState?.price}</p>
      <button>Adicionar ao Carrinho</button>
    </ProductViewContainer>
  );
}
