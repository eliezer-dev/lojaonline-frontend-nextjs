'use client'

import { AutoComplete, Input} from "antd";
import { InputSearchContainer } from "./styles";
import {useSearchContext} from "@/context/SearchContext";
import {SearchOutlined} from "@ant-design/icons";


export  default function InputSearch () {

    const { searchQuery, handleSearchContext } = useSearchContext();


    return(
        <InputSearchContainer>
            <Input
                size="large"
                placeholder="Pesquise por produtos"
                prefix={<SearchOutlined />}
                addonAfter='Buscar'
                variant="borderless"
                className="header_input_search"
                onChange={(e) => handleSearchContext(e.target.value)}
                value={searchQuery.query}

            />
      </InputSearchContainer>
    )
}