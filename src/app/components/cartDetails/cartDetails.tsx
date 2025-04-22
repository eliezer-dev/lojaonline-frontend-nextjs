'use client'

import {
    CartDetailsContainer,
    ClosedButton,
    ItemsContainer, TotalPrice,
    TotalQuantity,
    TotalValueContainer,
    ButtonContainer,
    HeaderContainer,
    ContentContainer,
    ItemSelectContainer,
    ImageContainer,
    ShortInformation
} from "@/app/components/cartDetails/styles";
import { useData } from "@/context/DataContext";
import Image from "next/image"
import {useEffect, useState} from "react";
import { CloseOutlined } from "@ant-design/icons";
import ButtonText from "@/ui/buttonText/buttonText";
import {formatToBRL} from "@/util/geral";
import Button from "@/ui/button/button";
import { OrderRequest } from "@/types/order-types";
import { CreateOrder } from "@/app/api/actions/order";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export interface PriceStripe {
    price: string
    quantity: number
}

interface ItemSelectedProps {
    productName: string,
    productPrice: number,
    productImage: string,
    onClick?: () => void
}

export function ItemSelected(props : ItemSelectedProps) {

    const priceFormated = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
         }).format(props.productPrice!)


    return(
        <ItemSelectContainer>
            <ImageContainer>
                <Image src={props.productImage} alt="image of item selected" width={80} height={80}  />
            </ImageContainer>

            <ShortInformation>
                <p>{props.productName}</p>
                <p className="bold">{priceFormated}</p>
                <ButtonText title={'Remover'} onClick={props.onClick} />
            </ShortInformation>

        </ItemSelectContainer>
    )
}


export default function CartDetails() {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
    const {isCartActive, handleCartDetails, data, handleRemoveItemData} = useData();
    const { login, isAuthenticated, user } = useAuth();
    const router = useRouter();    

    const getTotalPrice = () => {
        if (data.length > 0) {
            let total = 0
            data.forEach((cartItem) => {
                total += cartItem.price
            })
            return total
        }
        return 0
    }

    const getTotalPriceFormatedToBRL = () => {
        return formatToBRL(getTotalPrice())
    }


    const handleCreateOrder = async () => {
        setIsCreatingCheckoutSession(true)
            
        if (data != null && data.length > 0) {

                let orderRequest = {} as OrderRequest;
                orderRequest.userId = 1
                orderRequest.clientId = user?.id!
                orderRequest.totalValue = getTotalPrice()
                orderRequest.orderItems = []

                data.forEach((cartItem) => {
                    orderRequest.orderItems.push(
                        {
                            productId: cartItem.id,
                            name: cartItem.name,
                            quantity: 1,
                            price: cartItem.price,
                         
                        }
                    )
                })

              
                orderRequest.orderInstallments = [{
                    paymentMethod:1,
                    installment: 1,
                    numberOfInstallments:1,
                    installmentValue: getTotalPrice()
                }]
                
                const response = await CreateOrder(orderRequest);
                router.push(response.pagarMe.url);
        }

    };
        

    function handleRemoveCartItem (cartItemId : number) {
        handleRemoveItemData(cartItemId)
    }

    function handleDisabledCartDetails () {
        handleCartDetails(false)
    }


    return (
         <CartDetailsContainer className={isCartActive ? 'enabled' : 'disabled'}>
            <HeaderContainer>
                <ClosedButton onClick = {handleDisabledCartDetails}>
                    <CloseOutlined />
                </ClosedButton>
                <h1>Carrinho</h1>
            </HeaderContainer>
            <ContentContainer>
                <ItemsContainer>
                    {data != null && data.length > 0 && 
                    data.map((cartItem, index) => (
                            <ItemSelected key={index} productName={cartItem.name}
                                      productPrice={cartItem.price}
                                      productImage={cartItem.images[0].link}
                                      onClick={() => handleRemoveCartItem(cartItem.id) }
                            />
                        )

                    )}

                </ItemsContainer>
                 <TotalValueContainer>
                    <TotalQuantity>
                        <p>Quantidade</p>
                        <p>{data.length} itens</p>
                    </TotalQuantity>

                    <TotalPrice>
                        <p style={{fontSize: "18px"}}>Valor Total</p>
                        <p style={{fontSize: "24px"}}>{getTotalPriceFormatedToBRL()}</p>
                    </TotalPrice>
                    <Button onClick={handleCreateOrder}
                            title={"Finalizar Compra"}
                            disabled={isCreatingCheckoutSession || data.length == 0}/>
                </TotalValueContainer>
            </ContentContainer>

        </CartDetailsContainer>
    )
}