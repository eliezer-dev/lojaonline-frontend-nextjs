import {cepInfo} from "@/types/cepInfo-types";

export const SearchCep = async (cep: string):Promise<cepInfo> => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return await response.json();
};
