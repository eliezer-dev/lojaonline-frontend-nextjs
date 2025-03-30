'use client'

import { ProductResponse } from '@/types/product-types';
import { createContext, ReactNode, useContext, useState } from 'react';

type DataContextType = {
    data: ProductResponse[]
    setData: (value: ProductResponse[]) => void;
    addProductToCart (value: ProductResponse): void;
    handleCartDetails(value: boolean): void;
    handleRemoveItemData(value: number): void;
    isCartActive:boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);



export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<ProductResponse[]>([]);
    const [isCartActive, setIsCartActive] = useState(false);


    const addProductToCart = (item: ProductResponse) => {
        setData((prevData) => [...prevData, item]);
    };

    const handleCartDetails = (state:boolean)=> {
        setIsCartActive(state)
    }

    const handleRemoveItemData = (itemId:number) => {
        if (data.length === 1) {
            setIsCartActive(false)
        }
        setData(data.filter(dataItem => dataItem.id !== itemId ))
    }

    return (
        <DataContext.Provider value={{ data, setData,
            addProductToCart,
            handleCartDetails,
            isCartActive,
            handleRemoveItemData

        }}>
            {children}
        </DataContext.Provider>
    );
};



export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
