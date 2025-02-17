import api from "@/lib/api";
import {ProductResponse} from "@/types/product-types";
import {CategoryResponse} from "@/types/category-types";
import {OrderRequest, OrderResponse} from "@/types/order-types";

export const CreateOrder = async (orderRequest: OrderRequest) => {
    try {
        const response = await api.post<OrderResponse>(`/orders?user`, orderRequest);
        return response.data;
    } catch (error) {
        // Captura o erro e processa ele, se necessário
        console.error("Erro ao criar o pedido:", error);

        // Você pode optar por lançar o erro novamente ou retornar um valor padrão
        throw new Error("Erro ao criar o pedido. Tente novamente mais tarde.");
    }


}