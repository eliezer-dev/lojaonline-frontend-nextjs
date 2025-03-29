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
import logoVeganNatu from "@/assets/logoVeganNatu.png";
import Image from "next/image";
import {useEffect, useState} from "react";
import {GetProductByName} from "@/app/api/actions/products";
import {GetAllCategories} from "@/app/api/actions/category";
import {CategoryResponse} from "@/types/category-types";
import {AuditOutlined, HeartOutlined, HeartTwoTone, ShoppingCartOutlined} from "@ant-design/icons";
import {UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface HeaderButtonProps {
    href?: string; 
    icon: React.ReactNode; 
    title: string; 
    subtitle?: string;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ href, icon, title, subtitle }) => {
    const ButtonContent = (
        <HeaderButtonsContainer>
            {icon}
            <div className="content">
                <p className={subtitle ? "" : "strong"}>{title}</p>
                {subtitle && <p className="strong">{subtitle}</p>}
            </div>
        </HeaderButtonsContainer>
    );
    
    return href ? <Link href={href}>{ButtonContent}</Link> : ButtonContent;
};



export default function Header () {
    const [categoriesState, setCategoriesState] = useState<CategoryResponse[]>([]);
    const { login, isAuthenticated, user } = useAuth();
    
    useEffect(() => {
        fetchCategories ()
    }, [])
    
    const fetchCategories = async ()=> {
        const categories = await GetAllCategories();
        setCategoriesState(categories);
    }
    
    return (
        <HeaderContainer>
            
            <HeaderSearchAndButtonsContainer>
                <div className={'content'}>
                    <div className={'header_logo_input'}>
                        <Link href='/'>
                            <LogoContainer>
                                <Image src={logoVeganNatu} alt="logo" width={100} height={40}/>
                            </LogoContainer>
                        </Link>
                        <InputSearch/>
  
                    </div>
                    
                    <div className={'buttons'}>
                        <HeaderButton 
                            href='/login'
                            icon={
                                <UserOutlined className={'header_buttons_icon'} />
                            }
                            title="Bem vindo"
                            subtitle={isAuthenticated ? user?.fullname.split(" ")[0] : "Entre ou Cadastre-se"}
                        
                        />                            

                        <HeaderButton
                            href='/favorites'
                            icon={<HeartOutlined className={'header_buttons_icon'}/>}
                            title="Meus"
                            subtitle="Favoritos"
                        />

                        <HeaderButton
                            href='/cart'
                            icon={<ShoppingCartOutlined className={'header_buttons_icon'}/>}
                            title="Meu"
                            subtitle="Carrinho"
                        />
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