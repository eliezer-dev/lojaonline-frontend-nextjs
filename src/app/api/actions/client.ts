import api from "@/lib/api";
import {ClientRequest, ClientResponse} from "@/types/client-types";

export const CreateClient = async (clientRequest: ClientRequest) => {
   
    try {
        const response = await api.post<ClientResponse>(`/clients/create`, clientRequest);
        return response.data;
    
    } catch (error) {
    
        console.error("Erro ao criar o cliente:", error);
       
        throw new Error("Erro ao criar o cliente. Tente novamente mais tarde.");
    }


}

export const GetClientById = async (id: number) => {
   
    try {
        const response = await api.get<ClientResponse>(`/clients/${id}`);
        return response.data;
    
    } catch (error) {
    
        console.error("Erro ao carregar o cliente:", error);
       
        throw new Error("Erro ao carregar o cliente, feche a página e tente logar novamente.");
    }

}