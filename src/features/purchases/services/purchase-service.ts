import {GetAllPurchases} from "../types/GetAllPurchases.ts";

const API_PURCHASES = import.meta.env.VITE_BASE_API_URL+"/v1/purchase";

export const fetchPurchases: () => Promise<GetAllPurchases> = async() => {
    const response = await fetch(API_PURCHASES);
    return response.json();
}