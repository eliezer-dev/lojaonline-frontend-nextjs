'use client'

import { AutoComplete, Input} from "antd";
import { InputSearchContainer } from "./styles";
import {useSearchContext} from "@/context/SearchContext";
import {SearchOutlined} from "@ant-design/icons";


export  default function InputSearch () {
    // const { icon: Icon, title, onClick, disabled } = props;
    const {Search} = Input
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

            />
        {/*<AutoComplete*/}
        {/*// popupClassName="certain-category-search-dropdown"*/}
        {/*// popupMatchSelectWidth={500}*/}
        {/*style={{*/}
        {/*  width: '100%',*/}
        {/*    height: '48'*/}
        {/*}}*/}
        {/*// options={options}*/}
        {/*// size="large"*/}
        {/*>*/}

      {/*</AutoComplete>*/}
      </InputSearchContainer>
    )
}