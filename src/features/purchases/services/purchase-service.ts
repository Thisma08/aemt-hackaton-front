import {GetAllPurchases} from "../types/GetAllPurchases.ts";
import {CreatePurchaseResult} from "../types/CreatePurchaseResult.ts";
import {CreatePurchaseCommand} from "../types/CreatePurchaseCommand.ts";

const API_PURCHASES = import.meta.env.VITE_BASE_API_URL+"/v1/purchase";

export const fetchPurchases: () => Promise<GetAllPurchases> = async() => {
    const response = await fetch(API_PURCHASES);
    return response.json();
}

export const createPurchase: (output: CreatePurchaseCommand) => Promise<CreatePurchaseResult> = async(output: CreatePurchaseCommand) => {
    const response = await fetch(API_PURCHASES,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(output)
    });
    return await response.json();
}