import {Budget} from "../types/budget.ts";
import {CreateBudgetOutput} from "../types/CreateBudgetOutput.ts";
import {GetAllBudgets} from "../types/GetAllBudgets.ts";
import {UpdateBudgetCommand} from "../types/UpdateBudgetCommand.ts";
import {GetRemainingBalanceOutput} from "../types/GetRemainingBalanceOutput.ts";
import {GetCategoryStatsQuery} from "../../statistics/types/GetCategoryStatsQuery.ts";
import {GetCategoryStatsResult} from "../../statistics/types/GetCategoryStatsResult.ts";

const API_BUDGETS = import.meta.env.VITE_BASE_API_URL+"/v1/Budget"

export const fetchBudgets: () => Promise<GetAllBudgets> = async() => {
    const response = await fetch(API_BUDGETS);
    return response.json();
}

export const fetchBudgetById: (id: number) => Promise<Budget> = async(id: number) => {
    const response = await fetch(`${API_BUDGETS}/${id}`);
    return response.json();
}

export const fetchRemainingBalance: (id: number) => Promise<GetRemainingBalanceOutput> = async(id: number) => {
    const response = await fetch(`${API_BUDGETS}/balanceRemaining/${id}`);
    return response.json();
}

export const createBudget: (output: CreateBudgetOutput) => Promise<Budget>
    = async (output: CreateBudgetOutput) => {
    const response = await fetch(API_BUDGETS,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(output)
    })

    return await response.json();
}

export const updateBudget: (budget: UpdateBudgetCommand) => Promise<Response>
= async(budget: UpdateBudgetCommand) => {
    return await fetch(`${API_BUDGETS}/${budget.month}/${budget.year}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(budget)
    });
}

export const getcategoryStats: (command: GetCategoryStatsQuery) => Promise<GetCategoryStatsResult> = async(command: GetCategoryStatsQuery) => {
    const response = await fetch(`${API_BUDGETS}/getCategoryStats/${command.month}/${command.year}`)
    return response.json();
}