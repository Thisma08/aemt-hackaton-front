import "./PieChartComponent.css";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Budget} from "../../../budget/types/budget.ts";
import {fetchBudgets, fetchRemainingBalance, getcategoryStats} from "../../../budget/services/budget-service.ts";
import {CategoryStats} from "../../types/CategoryStats.ts";
import {Chart} from "react-google-charts";
import colorPalette from "../../../../shared/ColorPalette.ts";

export function PieChartComponent() {
    const baseColors = colorPalette.sort(() => Math.random() - 0.5);
    const generateColors = (numColors: number) => {
        return baseColors.slice(-(baseColors.length - numColors));
    }
    const [showError,setShowError] = useState<boolean>(false);
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const defaultBudget = useRef<Budget>();
    const [selectedBudget, setSelectedBudget] = useState<Budget>({
        id: 0,
        budget: 500,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        balanceRemaining: 500,
        purchased: []
    });
    const [chart, setChart] = useState<JSX.Element>(<></>);
    const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
    const [remainingBalance, setRemainingBalance] = useState<number>(0);
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    useEffect(() => {
        const fetchInitialData = async () => {
            const budgetList = await fetchBudgets();
            setBudgets(budgetList.Budgets);
            if (budgetList.Budgets.length > 0) {
                const currentBudget = budgetList.Budgets.find(budget => {
                    const date = new Date();
                    return budget.month === (date.getMonth() + 1) && budget.year === date.getFullYear();
                }) || budgetList.Budgets[0];
                setSelectedBudget(currentBudget);
                defaultBudget.current = currentBudget;
                const statList = await getcategoryStats({
                    month: currentBudget.month,
                    year: currentBudget.year
                });
                const remainingBalance = await fetchRemainingBalance(currentBudget.id);
                setUpStats(statList.categoryStats, remainingBalance.balanceRemaining);
            }
        };
        fetchInitialData();
    }, []);

    function setUpStats(list: CategoryStats[], balance: number) {
        setCategoryStats(list);
        setRemainingBalance(balance);
    }

    useEffect(() => {
        if (categoryStats.length > 0) {
            const dataDepenses: (string | number)[][] = [
                ["Category", "Sum"]
            ];
            categoryStats.forEach(value => {
                const stat = [value.categoryName, value.totalAmount];
                dataDepenses.push(stat);
            });

            const optionsDepenses = {
                title: `Dépenses pour le ${selectedBudget.month}/${selectedBudget.year}`,
                colors: generateColors(dataDepenses.length - 1)
            };
            const optionsBalance = {
                title: `Balance ${selectedBudget.month}/${selectedBudget.year}`,
                colors: generateColors(2)
            };
            const dataBalance = [
                ["Category", "Sum"],
                ["Restant", Math.max(0, remainingBalance)],
                ["Utilisé", Math.min(selectedBudget.budget, selectedBudget.budget - remainingBalance)]
            ];
            setChart(
                <>
                    <Chart
                        chartType="PieChart"
                        data={dataDepenses}
                        options={optionsDepenses}
                        width={"100%"}
                        height={"400px"}
                    />
                    <Chart
                        chartType="PieChart"
                        data={dataBalance}
                        options={optionsBalance}
                        width={"100%"}
                        height={"400px"}
                    />
                </>
            );
        } else {
            setChart(
                <div style={{ display: showError ? 'block' : 'none' }} className="error-message">
                    Le budget sélectionné n'a pas de dépenses.
                </div>
            );
        }
    }, [categoryStats, remainingBalance]);

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const budget = budgets.find(value => value.id === parseInt(e.target.value));
        if (budget) setSelectedBudget(budget);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setShowError(true);
        const fetchStats = async () => {
            const statList = await getcategoryStats({
                month: selectedBudget.month,
                year: selectedBudget.year
            });
            const balance = await fetchRemainingBalance(selectedBudget.id);
            setUpStats(statList.categoryStats, balance.balanceRemaining);
        };
        fetchStats();
    }

    return (
        <>
            <div className="formWrapper">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="fieldContainer">
                            <label htmlFor="budget">Budget:</label>
                            <select name="selectedBudget" value={selectedBudget.id} onChange={handleChange}>
                                {budgets.map(budget => (
                                    <option value={budget.id} key={budget.id}>
                                        {`${months[budget.month - 1]} ${budget.year}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <input type="submit" />
                </form>
            </div>
            <div className="pieChartContainer">
                {chart}
            </div>
        </>
    );
}