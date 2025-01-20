import {Budget} from "../types/budget.ts";
import {createContext, ReactNode, useContext, useEffect, useReducer} from "react";
import {fetchBudgets} from "../services/budget-service.ts";

export interface Action{
    type: string;
    budget: Budget
}

export const BudgetContext = createContext<Budget[]>([]);
export const BudgetDispatchContext = createContext<(action: Action) => void>(null!!);

function reducer(budgets: Budget[], action: Action){
    switch(action.type){
        case "add":
            return [...budgets, action.budget];
        case "remove":
            return budgets.filter(budget => budget.id === action.budget.id);
        default:
            throw Error(`Unknown action type ${action.type}`);
    }
}

export function BudgetProvider({children}: { children: ReactNode }){
    const [budget, dispatch] = useReducer(reducer,[]);
    useEffect(() => {
        const sendFetchBudgets = async() => {
            const budgets = await fetchBudgets();
            console.log(budgets);
            budgets.Budgets.forEach((value) => dispatch({
                type: "add",
                budget: value
            }))
        }
        sendFetchBudgets()
    },[])

    return <>
        <BudgetContext.Provider value={budget}>
            <BudgetDispatchContext.Provider value={dispatch}>
                {children}
            </BudgetDispatchContext.Provider>
        </BudgetContext.Provider>
    </>

}

export const useBudgets = () => useContext(BudgetContext);
export const useBudgetDispatch = () => useContext(BudgetDispatchContext);