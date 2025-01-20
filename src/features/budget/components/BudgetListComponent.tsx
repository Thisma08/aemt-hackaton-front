import {useBudgets} from "../context/BudgetContext.tsx";



export function BudgetListComponent(){
    const budgets = useBudgets();
    return <ul>
            {budgets.map((budget) => (
                <li key={budget.id + "_" + budget.budget}>
                    {budget.id} : {budget.budget} -
                    {budget.month}/{budget.year}
                </li>
            ))}
        </ul>

}
