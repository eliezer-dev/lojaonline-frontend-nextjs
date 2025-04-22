export interface OrderResponse {
    id: number;
    userId: number;
    orderItems: Array<OrderItem>;
    totalValue: number;
    invoiceNumber: string;
    orderInstallments: Array<OrderInstallment>;
    pagarMe: PagarMe;
    createAt: string;
    updateAt: string;
    canceled: boolean;
    canceledBy: null | string;
    canceledAt: null | string;
    cancellationReason: null | string;
}

export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    createAt: string;
    updateAt: string;

}

export interface OrderInstallment {
    id: number;
    paymentMethod: number;
    installment: number;
    numberOfInstallments: number;
    installmentValue: number;
}

export interface PagarMe {
    idFatura: string;
    url: string;
}


export interface OrderRequest {
    clientId:number;
    userId: number;
    totalValue: number;
    invoiceNumber: string;
    orderItems: Array<OrderRequestItem>;
    orderInstallments: Array<OrderRequestInstallment>;
}

export interface OrderRequestItem {
    productId: number;
    name: string;
    quantity: number;
    price: number;
}

export interface OrderRequestInstallment {
    paymentMethod: number;
    installment: number;
    numberOfInstallments: number;
    installmentValue: number;
}
