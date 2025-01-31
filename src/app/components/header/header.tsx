'use client'

import {
    HeaderCategoriesContainer,
    HeaderButtonsContainer,
    HeaderCategoryItemContainer,
    HeaderContainer,
    HeaderSearchAndButtonsContainer,
    LogoContainer
} from "./styles";
import InputSearch from "@/ui/inputSearch/inputSearch";
import logoHeader from "@/assets/logo.png";
import Image from "next/image";
import {useEffect, useState} from "react";
import {GetProductByName} from "@/app/api/actions/products";
import {GetAllCategories} from "@/app/api/actions/category";
import {CategoryResponse} from "@/types/category-types";
import {AuditOutlined, HeartOutlined, HeartTwoTone, ShoppingCartOutlined} from "@ant-design/icons";
import {UserOutlined} from "@ant-design/icons";


export default function Header () {
    const [categoriesState, setCategoriesState] = useState<CategoryResponse[]>([]);
    
    useEffect(() => {
        fetchCategories ()
    }, [])
    
    const fetchCategories = async ()=> {
        const categories = await GetAllCategories();
        console.log(categories)
        setCategoriesState(categories);
    }
    
    return (
        <HeaderContainer>
            
            <HeaderSearchAndButtonsContainer>
                <div className={'content'}>
                    <div className={'header_logo_input'}>
                        <LogoContainer>
                            <Image src={logoHeader} alt="logo" width={100} height={40}/>
                        </LogoContainer>
                        <InputSearch/>
                    </div>
                    
                    <div className={'buttons'}>
                        <HeaderButtonsContainer >
                            <UserOutlined className={'header_buttons_icon'} />
                            <div className={'content'}>
                                <p>Bem vindo</p>
                                <p className={'strong'}>Entre ou Cadastre-se</p>
                            </div>
                        </HeaderButtonsContainer>

                        <HeaderButtonsContainer>
                            <HeartOutlined className={'header_buttons_icon'}/>
                            <div className={'content'}>
                                <p className={'strong'}>Meus <br/> Favoritos</p>
                            </div>
                        </HeaderButtonsContainer>

                        <HeaderButtonsContainer>
                            <ShoppingCartOutlined className={'header_buttons_icon'}/>
                            <div className={'content'}>
                                <p className={'strong'}>Meu <br/> Carrinho</p>
                            </div>
                        </HeaderButtonsContainer>      
                    </div>
                  
                    
                </div>
            </HeaderSearchAndButtonsContainer>
            <HeaderCategoriesContainer>
                <div className={'content'}>
                    {(categoriesState != null && categoriesState.length > 0) && 
                        categoriesState.map((category) => {
                            return (
                                <HeaderCategoryItemContainer key={category.categoryId}>
                                    <span>{category.descriptionMenu.slice(0,19)}</span>
                                
                                </HeaderCategoryItemContainer>
                            )
                        })}
                </div>    
            </HeaderCategoriesContainer>

            
           
        </HeaderContainer>
    )   
}