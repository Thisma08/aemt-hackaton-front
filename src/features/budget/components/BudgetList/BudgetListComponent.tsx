import {useBudgets} from "../../context/BudgetContext.tsx";
import "./BudgetListComponent.css"
import {useEffect, useState} from "react";
import {fetchRemainingBalance} from "../../services/budget-service.ts";
import * as XLSX from "xlsx";


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

    const [remainingBalances, setRemainingBalances] = useState<{ [key: string]: number }>({});

    const fetchBalanceForBudget = async (budgetId: number) => {
        const result = await fetchRemainingBalance(budgetId);
        setRemainingBalances(prevState => ({
            ...prevState,
            [budgetId]: result.balanceRemaining
        }));
    };

    useEffect(() => {
        filteredBudgets.forEach(budget => {
            if (!remainingBalances[budget.id]) {
                fetchBalanceForBudget(budget.id);
            }
        });
    }, [filteredBudgets, remainingBalances]);

    const generateCSV = () => {
        if (filteredBudgets.length === 0) {
            alert("Aucun budget à exporter.");
            return;
        }

        const headers = ["Année", "Mois", "Budget (€)", "Solde Restant (€)"];
        const rows = filteredBudgets.map(budget => {
            const remainingBalance = remainingBalances[budget.id] ?? "En cours...";
            return [
                budget.year,
                months[budget.month - 1],
                budget.budget,
                remainingBalance
            ].join(",");
        });

        const csvContent = [headers.join(","), ...rows].join("\n");

        const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "budgets.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generateExcel = () => {
        if (filteredBudgets.length === 0) {
            alert("Aucun budget à exporter.");
            return;
        }
        const data = filteredBudgets.map((budget) => ({
            Année: budget.year,
            Mois: months[budget.month - 1],
            Budget: budget.budget,
            "Solde Restant": remainingBalances[budget.id] || "N/A",
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Budgets");

        XLSX.writeFile(workbook, "budgets.xlsx");
    };

    return (
        <div className={"budgetListContainer"}>
            <div className={"budgetListTitleContainer"}>
                <h2>Liste des budgets</h2>
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

                <button className={"generateCsvButton"} onClick={generateCSV}>Générer CSV</button>
                <button className={"generateExcelButton"} onClick={generateExcel}>Générer Excel</button>
            </div>

            <div>
                {filteredBudgets.map((budget, index) => {
                    const isFirstOfYear =
                        index === 0 || budget.year !== filteredBudgets[index - 1].year;

                    return (
                        <div key={`${budget.year}-${budget.month}`}>
                            {isFirstOfYear && (
                                <div className={"yearContainer"}>
                                    <img src={"candy_cane_l.png"} alt={"candy_cane_l"}/>
                                    <h2 className="yearTitle">{budget.year}</h2>
                                    <img src={"candy_cane_r.png"} alt={"candy_cane_r"}/>
                                </div>
                            )}
                            <div className={"budgetListItem"}>
                                <strong>{months[budget.month - 1]} {budget.year}</strong>
                                <br/>
                                {budget.budget} €
                                <br/>
                                {remainingBalances[budget.id] && (
                                    <span>Solde restant: {remainingBalances[budget.id]} €</span>
                                )}
                                <br/>
                                {remainingBalances[budget.id] < 0 && (
                                    <span className={"exceededBalanceWarning"}>⚠️ Solde dépassé! ⚠️</span>
                                )}
                                <br/>
                                <button
                                    className={"editButton"}
                                    onClick={() =>
                                        window.location.href = `http://localhost:5173/budgets/update/${budget.id}`
                                    }
                                >
                                    Modifier
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
