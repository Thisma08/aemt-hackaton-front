import {useBudgetDispatch, useBudgets} from "../context/BudgetContext.tsx";
import {Budget} from "../types/budget.ts";
import {FormBudgetComponent} from "./CreateBudget/FormBudgetComponent.tsx";
import {createBudget} from "../services/budget-service.ts";
import {useEffect} from "react";
import {BudgetListComponent} from "./BudgetList/BudgetListComponent.tsx";
import {useLocation} from "react-router";
import '../../../shared/component/Componnent.css';

export default function BudgetManagerComponent() {
    const location = useLocation();
    const dispatch = useBudgetDispatch();
    const budgets = useBudgets();

    useEffect(() => {
        if (location.state?.reload) {
            console.log("Rechargement du composant Budget Manager...");
        }
    }, [location.state]);

    const handleBudgetCreation = (budget: Budget) => {
        const sendBudget = async () => {
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
        <FormBudgetComponent onBudgetCreation={handleBudgetCreation} existingBudgets={budgets}/>
        <img src={"garland.png"} alt={"garland-decoration"} className="garland-image"/>
        <BudgetListComponent/>
    </>
}