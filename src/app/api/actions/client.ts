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