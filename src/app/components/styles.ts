'use client'

import styled from "styled-components"

export const ProductViewContainer = styled.div`
    border-radius: 8px;
    background-color: white;
    width: 100%;
    max-width: 225px;
    max-height: 357px;
    border: 1px solid ${({theme}) => theme.colors.gray300};
    padding: 1rem;
    display: flex;
    gap: 3rem;
    flex-direction: column;
    align-items: center;

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