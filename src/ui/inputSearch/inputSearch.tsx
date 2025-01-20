'use client'

import { AutoComplete, Input} from "antd";
import { InputSearchContainer } from "./styles";
import {useData} from "@/context/SearchContext";


export  default function InputSearch () {
    // const { icon: Icon, title, onClick, disabled } = props;
    const {Search} = Input
    const { searchQuery, handleSearchContext } = useData();


    return(
        <InputSearchContainer>
        <AutoComplete
        // popupClassName="certain-category-search-dropdown"
        // popupMatchSelectWidth={500}
        style={{
          width: 250,
        }}
        // options={options}
        // size="large"
      >
        <Search 
            size="large" 
            placeholder="Digite o produto aqui" 
            onChange={(event) => handleSearchContext(event.target.value)}
        />
      </AutoComplete>
      </InputSearchContainer>
    )
}