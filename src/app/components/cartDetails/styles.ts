'use client'

import styled from 'styled-components';

export const CartDetailsContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 1200;
    width: 344px;
    background-color: ${({ theme }) => theme.colors.white};
    border-top: 3px solid ${({theme}) => theme.colors.green500};
    padding: 24px;
    overflow: hidden;

    &.disabled {
        transform: translateX(110%);
        opacity: 0;
        transition: all 0.2s ease-in-out;
    }

    &.enabled {
        transform: translateY(0%);
        opacity: 1;
    }


   
`;

export const ContentContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 152px);
`


export const HeaderContainer = styled.header`
    display: flex;
    gap: 24px;
    align-items: stretch;

    svg {
        font-size: 24px;
        color: ${({ theme }) => theme.colors.green500};
    }

    h1 {
            font-size: 24px;
        }
`;



export const ButtonContainer = styled.button`
    background-color: ${({ theme }) => theme.colors.green500};
    width: 100%;
    height: 69px;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: bold;
    border: none;
    border-radius: 8px;

    &:hover {
        color: ${({ theme }) => theme.colors.green300};
        cursor: pointer;
    }
`;

export const ItemsContainer = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ClosedButton = styled.button`
    /* position: absolute;
    right: 24px;
    top: 24px;*/
    background-color: transparent;
    border: none;

    &:hover {
        cursor: pointer;
    }
`;

export const TotalValueContainer = styled.div`
    .total_item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 7px;
    }

    .bold {
        font-weight: bold;
    }
`;

export const TotalQuantity = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 7px;
`;

export const TotalPrice = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 57px;
    font-weight: bold;
`;

export const ItemSelectContainer = styled.div`
    display: grid;
    grid-template-columns: 101.94px 262.06px;
    overflow: hidden;

    img {
        object-fit: cover;
    }
`;

export const ImageContainer = styled.div`
    width: 100%;
    max-width: 101.94px;
    height: 93px;
    background:  ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 0.25rem;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ShortInformation = styled.div`
    margin-left: 20px;
    font-size: ${({ theme }) => theme.fontSizes.md};
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bold {
        font-weight: bold;
    }
`;