import styled from 'styled-components';

export const InputSearchContainer = styled.div`
    width: 400px;
    height: 48px;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: ${({ theme }) => theme.colors.green100};
    
    &:hover {
        cursor: pointer;
    }
    
    .header_input_search {
        .ant-input-group-addon {
            color: #52ae47;
            font-weight: bold;
        }
    }
    

`;