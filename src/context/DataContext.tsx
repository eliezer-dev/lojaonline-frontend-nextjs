'use client'

import { createContext, ReactNode, useContext, useState } from 'react';

interface dataProps {
    name: string;
    id: number;
}

type DataContextType = {
    data: dataProps[]
    setData: (value: dataProps[]) => void;
    // addProductToCart (value: ProductProps): void;
    // handleCartDetails(value: boolean): void;
    // handleRemoveItemData(value: string): void;
    // showCartDetails:boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);



export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<dataProps[]>([]);
    // const [showCartDetails, setShowCartDetails] = useState(false);


    // const addProductToCart = (item: ProductProps) => {
    //     setData((prevData) => [...prevData, item]);
    // };

    // const handleCartDetails = (state:boolean)=> {
    //     console.log("chegou aqui no data context" + state)
    //     setShowCartDetails(state)
    // }

    // const handleRemoveItemData = (itemId:string) => {
    //     setData(data.filter(dataItem => dataItem.id !== itemId ))
    // }

    return (
        <DataContext.Provider value={{ data, setData,
            // addProductToCart,
            // handleCartDetails,
            // showCartDetails,
            // handleRemoveItemData

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
