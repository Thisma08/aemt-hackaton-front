import {Budget} from "../../budget/types/budget.ts";

export interface CreatePurchaseResult {
    id: number;
    amount: number;
    purchaseDate: Date;
    category: string;
    budget: Budget;
}