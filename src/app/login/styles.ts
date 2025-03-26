'use client'

import styled from "styled-components"
import { Button} from "antd";

export const LoginContainer = styled.div`
    height: 550px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    
`

export const LoginContent = styled.div`
    width: 480px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({theme}) => theme.colors.gray300};
    border-radius: 8px;
    overflow: hidden;
    padding: 36px;
    gap: 16px;
    background-color: ${({theme}) => theme.colors.white};

    h1 {
        font-size: ${({theme}) => theme.fontSizes['2xl']};
        color: ${({theme}) => theme.colors.gray900};
        text-align: center;
        margin-bottom: 16px;
    }

    .login_button {
        margin-top: 16px;
        margin-bottom: 8px;
        width: 100%;
        height: 48px;
        border: none;
        background-color: ${({ theme }) => theme.colors.green500};
        color: ${({ theme }) => theme.colors.white};
        font-weight: bold ;
        font-size: ${({ theme }) => theme.fontSizes['no']};
        

        &:hover {
            cursor: pointer !important;
            background-color: ${({ theme }) => theme.colors.green300} !important;
            opacity: 0.8 !important;
            font-weight: bold !important;
            color: ${({ theme }) => theme.colors.white} !important;
        }

    }

`
