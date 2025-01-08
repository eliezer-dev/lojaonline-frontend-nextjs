'use client'

import styled from "styled-components"

export const ProductViewContainer = styled.div`
    border-radius: 8px;
    background-color: white;
    width: 100%;
    max-width: 225px;
    height: 357px;
    border: 1px solid ${({theme}) => theme.colors.gray300};
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;

    .product_image_description {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 191px;
        justify-content: space-between;
        gap: 1rem;

        p {
            height: 57px;
            align-items: center;
        }
    }

    .product_price_button  {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .product_description {
        color: ${({theme}) => theme.colors.gray800};
        font-weight: 700;
    }

    .product_price {
        color: ${({theme}) => theme.colors.gray800};
        font-weight: 700;
        font-size: ${({theme}) => theme.fontSizes.lg};
    }

    img {

    }
  
`;