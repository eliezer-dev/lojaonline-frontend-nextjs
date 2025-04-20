'use client'

import { createContext, ReactNode, useContext, useState } from 'react';

export interface searchProps {
    query: string
}

type SearchContextType = {
    searchQuery: searchProps
    setSearchQuery: (value: searchProps) => void;
    handleSearchContext: (value: string) => void;
    // addProductToCart (value: ProductProps): void;
    // handleCartDetails(value: boolean): void;
    // handleRemoveItemData(value: string): void;
    // showCartDetails:boolean;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);



export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState<searchProps>({query: ''});

    const handleSearchContext = (value: string) => {
        const searchQuery = {
            query: value
        }
        setSearchQuery(searchQuery)
    
    }


    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery,
            handleSearchContext

        }}>
            {children}
        </SearchContext.Provider>
    );
};



export const useSearchContext = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};
