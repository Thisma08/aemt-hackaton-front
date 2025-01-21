import {Budget} from "../types/budget.ts";
import {CreateBudgetOutput} from "../types/CreateBudgetOutput.ts";
import {GetAllBudgets} from "../types/GetAllBudgets.ts";

const API_BUDGETS = import.meta.env.VITE_BASE_API_URL+"/v1/Budget"

export const fetchBudgets: () => Promise<GetAllBudgets> = async() => {
    const response = await fetch(API_BUDGETS);
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