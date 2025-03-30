'use client'

import styled from "styled-components"


export const HeaderContainer = styled.header`
    position: fixed; /* Torna o header fixo no topo */
    top: 0; /* Fixa no topo da página */
    left: 0; /* Fixa no lado esquerdo */
    width: 100%; /* Faz o header ocupar toda a largura da página */
    z-index: 1000;
    height: 150px;
    border-top: 3px solid ${({theme}) => theme.colors.green500};
    background-color: ${({theme}) => theme.colors.green500};
    
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export const HeaderSearchAndButtonsContainer = styled.div`
    height: 100px;
    width: 100%;
    
    background-color: ${({theme}) => theme.colors.white};
    
    .content {
        height: 100px;
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        margin-inline: auto;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .buttons {
        display: flex;
        gap: 1rem;
    }
    
    .header_logo_input {
        display: flex;
        gap: 1rem;
    }
`

export const LogoContainer = styled.div`
    width: 100px;
    height: 40px;
`

export const HeaderCategoriesContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 47px;
    
    .content {
        display: flex;
        height: 47px;
        align-items: center;
    }
`

export const HeaderCategoryItemContainer = styled.span `
    border-inline: .8px solid ${({theme}) => theme.colors.white};
    width: 171px;
    text-align: center;
    
    span {
        color: ${({theme}) => theme.colors.white};
        &:hover {
            cursor: pointer;
            border-bottom: .8px solid ${({theme}) => theme.colors.white};
        }
    }
   
 
`

export const HeaderButtonsContainer = styled.div`
    display: flex;
    gap: .5rem;
    align-items: center;
    
    &:hover {
        cursor: pointer;
    }
    
    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0;
        
      
    }

    .header_buttons_icon {
        height: 2rem;
        width: 2rem;
        background-color: ${({theme}) => theme.colors.green200};
        display: flex;
        justify-content: center;
        border-radius: 50%;

        svg {
            color: ${({theme}) => theme.colors.green500};
        }
    }
   .strong {
       font-weight: bold;
   }
`
