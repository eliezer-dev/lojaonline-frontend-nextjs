'use client'

import styled from "styled-components"

export const CadastroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1rem 1rem 2rem;
    width: 630px;
    margin: 182px auto 0 auto;
    border: 1px solid ${({theme}) => theme.colors.gray300};
    background-color: ${({theme}) => theme.colors.white};
    border-radius: 8px;
    
    h1 {
        text-align: left;
        width:  100%;
    }
    
    form {
        margin-top: 24px;
        width: 100%;
       
    }

    
`
