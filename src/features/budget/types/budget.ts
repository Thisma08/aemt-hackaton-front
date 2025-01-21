import {Purchase} from "../../purchases/types/Purchase.ts";

export interface Budget{
    id: number;
    budget: number;
    month: number;
    year: number;
    purchased:Purchase[];
    balanceRemaining: number;
}