'use client'

import styled from "styled-components"

export const LoginContainer = styled.div`
    height: 550px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;

    
`

export const LoginContent = styled.div`
    margin-top:   36px;
    width: 480px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({theme}) => theme.colors.gray300};
    border-radius: 8px;
    overflow: hidden;
    padding: 12px;
    gap: 16px;
    background-color: ${({theme}) => theme.colors.white};

    h1 {
        font-size: ${({theme}) => theme.fontSizes['2xl']};
        color: ${({theme}) => theme.colors.gray900};
        text-align: center;
        margin-bottom: 16px;
    }

`

export const LoginButton = styled.button`
    width: 100%;
    height: 48px;
    border: none;
    background-color: ${({theme}) => theme.colors.green100 };
    color: ${({theme}) => theme.colors.green500};
    font-size: ${({theme}) => theme.fontSizes['no']};

    &:hover {
        cursor: pointer;
        background-color: ${({theme}) => theme.colors.green200};
        font-weight: bold;
    }


`

