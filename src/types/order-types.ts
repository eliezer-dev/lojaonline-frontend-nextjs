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
    userId: number;
    totalValue: number;
    invoiceNumber: string;
    orderItems: Array<OrderRequestItem>;
    orderInstallments: Array<OrderRequestInstallment>;
}

export interface OrderRequestItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface OrderRequestInstallment {
    paymentMethod: number;
    installment: number;
    numberOfInstallments: number;
    installmentValue: number;
}


// Example of the desired OrderResponse object
const orderResponse: OrderResponse = {
    id: 16,
    userId: 1,
    orderItems: [
        {
            id: 11,
            productId: 5,
            quantity: 2,
            price: 1.5,
            createAt: "2025-02-10T21:40:17.433541",
            updateAt: "2025-02-10T21:40:17.433606",
        },
    ],
    totalValue: 3.0,
    invoiceNumber: "125408",
    orderInstallments: [
        {
            id: 21,
            paymentMethod: 1,
            installment: 1,
            numberOfInstallments: 2,
            installmentValue: 1.5,
        },
        {
            id: 22,
            paymentMethod: 1,
            installment: 2,
            numberOfInstallments: 2,
            installmentValue: 1.5,
        },
    ],
    pagarMe: {
        idFatura: "pl_nvEWYBpZay6qbySNXTOOeJ8Kd5k12043",
        url: "https://payment-link-sdx.pagar.me/pl_nvEWYBpZay6qbySNXTOOeJ8Kd5k12043",
    },
    createAt: "2025-02-10T21:40:17.337465",
    updateAt: "2025-02-10T21:40:17.337625",
    canceled: false,
    canceledBy: null,
    canceledAt: null,
    cancellationReason: null,
};