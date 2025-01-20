'use client'

import styled from "styled-components"

export const ProductSearchContainer = styled.div`
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

  
`;