import {useBudgets} from "../../context/BudgetContext.tsx";
import "./BudgetListComponent.css"
import {useState} from "react";

export function BudgetListComponent(){
    const budgets = useBudgets();

    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const [selectedMonth, setSelectedMonth] = useState("tous");
    const [selectedYear, setSelectedYear] = useState("tous");

    const years = [...new Set(budgets.map(b => b.year))].sort((b, a) => a - b);

    const sortedBudgets = [...budgets].sort((b, a) => {
        if (a.year === b.year) {
            return a.month - b.month;
        }
        return a.year - b.year;
    });

    const filteredBudgets = sortedBudgets.filter(budget => {
        const matchesMonth = selectedMonth === "tous" || budget.month === parseInt(selectedMonth);
        const matchesYear = selectedYear === "tous" || budget.year === parseInt(selectedYear);
        return matchesMonth && matchesYear;
    });

    return (
        <div className={"budgetListContainer"}>
            <div className={"budgetListTitleContainer"}>
                <h2>Liste des budgets :</h2>
            </div>

            <div className={"filtersContainer"}>
                <label>
                    Mois :
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="tous">Tous</option>
                        {months.map((month, index) => (
                            <option key={index} value={index + 1}>
                                {month}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Année :
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="tous">Toutes</option>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Liste des budgets */}
            {filteredBudgets.map((budget) => (
                <div className={"budgetListItem"} key={`${budget.year}-${budget.month}`}>
                    <strong>{months[budget.month - 1]} {budget.year}</strong>
                    <br />
                    {budget.budget} €
                </div>
            ))}
        </div>
    );
}
