'use client'

import styled from "styled-components"

export const HomeContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
`;

export const ProductSection = styled.section`
  display: flex;
  flex-direction: column;

  margin-top: 1rem;

  h1 {
    font-weight: bold;
    border-bottom: 2px solid ${({theme}) => theme.colors.gray300};
  }
  /* justify-content: center;
  align-items: center;
  
  gap: 1rem; */

  .products_list {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

`