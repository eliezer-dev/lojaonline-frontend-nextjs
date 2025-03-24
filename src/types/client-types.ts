import { UserToken } from "./userToken-types";

export interface ClientRequest{
    fullname: string;
    email: string;
    document: string;
    gender: string;
    birthDate: string;
    password: string;
    phone: ClientPhone[];
    address: ClientAddress;
}

export interface ClientPhone{
    countryCode: string;
    areaCode: string;
    number: string;

}

export interface ClientAddress {
    country: string;
    state: string;
    city: string;
    zipCode: string;
    neighborhood: string;
    street: string;
    number: string;
    complement?: string;
}

export interface ClientResponse {
    fullname: string;
    email: string;
    document: string;
    gender: string;
    birthdate: string;
    phone: ClientPhone[];
    clientToken:UserToken
    address: ClientAddress;
}
