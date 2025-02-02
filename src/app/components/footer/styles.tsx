'use client'

import styled from "styled-components";

export const FooterContainer = styled.footer`
    margin-top: 3rem;
    border-top: 8px solid ${({theme}) => theme.colors.green300};
    background-color: ${({theme}) => theme.colors.white};
    padding-bottom: 1rem;

    .payments_apps_socialMedia_section{
        padding-bottom: 3rem;
    }
    
    .copyright_section {
        border-bottom: none;
    }

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
    width: 272px;

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
    
    .apps {
        display: flex;
        gap: 1rem;
    }
    
    .social_media {
        display: flex;
        gap: 1rem;
        
        a {
            text-decoration: none;
            color: inherit;
        }
        
        svg {
            width: 2rem;
            height: 2rem;
            color: ${({theme}) => theme.colors.green500};
        }
    }
    
    .copyright {
        p {
            text-align: center;
            font-size: .8rem;
        }
    }

    .development_rights {
        
        display: flex;
        gap: 1rem;

        a {
            text-decoration: none;
            color: inherit;
        }

        svg {
            width: 2rem;
            height: 2rem;
            color: ${({theme}) => theme.colors.green500};
        }
        
        p {
            display: flex;
            align-items: center;
        }
    }
  

`