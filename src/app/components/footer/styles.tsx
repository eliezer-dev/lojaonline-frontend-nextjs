'use client'

import styled from "styled-components";

export const FooterContainer = styled.footer`
    margin-top: 3rem;
    height: 600px;
    border-top: 8px solid ${({theme}) => theme.colors.green300};
    background-color: ${({theme}) => theme.colors.white};

`;

export const FooterSection = styled.section`
    padding-top: 2rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 1rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.gray300};
    padding-bottom: .5rem;
`;

export const FooterContent = styled.div`
        
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .links {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        a {
            text-decoration: none;
            color: inherit;
        }
    }
    
    .cards {
        display: flex;
        gap: 1rem;
    }
  

`