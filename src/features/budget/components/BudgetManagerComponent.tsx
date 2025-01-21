import {useBudgetDispatch, useBudgets} from "../context/BudgetContext.tsx";
import {Budget} from "../types/budget.ts";
import {FormBudgetComponent} from "./CreateBudget/FormBudgetComponent.tsx";
import {createBudget} from "../services/budget-service.ts";
import {useEffect} from "react";
import {BudgetListComponent} from "./BudgetList/BudgetListComponent.tsx";

export default function BudgetManagerComponent() {
    const dispatch = useBudgetDispatch();
    const budgets = useBudgets();
    const handleBudgetCreation = (budget: Budget) => {
        const sendBudget = async() => {
            const budgetCreated = await createBudget({
                budget: budget.budget,
                month: budget.month,
                year: budget.year
            })
            dispatch({
                type: "add",
                budget: budgetCreated
            })
        }
        sendBudget();
    }

    useEffect(() => {
        console.log(budgets)
    }, [budgets]);

    return <>
        <FormBudgetComponent onBudgetCreation={handleBudgetCreation}/>
        <img src={"garland.png"} alt={"garland-decoration"} style={{ display: "block", margin: "20px auto", maxWidth: "20%", height: "auto" }}/>
        <BudgetListComponent/>
    </>
}