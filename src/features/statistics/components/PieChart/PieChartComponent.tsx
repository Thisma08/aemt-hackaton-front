import "./PieChartComponent.css";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Budget} from "../../../budget/types/budget.ts";
import {fetchBudgets, getcategoryStats} from "../../../budget/services/budget-service.ts";
import {CategoryStats} from "../../types/CategoryStats.ts";
import {Chart} from "react-google-charts";

export function PieChartComponent() {
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
    useEffect(() => {
        const sendFetchAllBudgetsAndCategories = async () => {
            const budgetList = await fetchBudgets();
            setBudgets(budgetList.Budgets);
            defaultBudget.current = budgets[0]
        }
        sendFetchAllBudgetsAndCategories()
    }, []);

    function checkIds() {
        if(budgets.length > 0 && selectedBudget.id===0 && defaultBudget.current!= undefined){
            setSelectedBudget(defaultBudget.current)
        }
    }

    function checkFormValidity() {
        return budgets.some(budget => budget.id === selectedBudget.id);
    }

    useEffect(() => {
        checkIds();
        checkFormValidity()
    }, [selectedBudget]);
    
    // const data = [
    //     ["Category", "Sum"],
    //     ["Loisirs", 100],
    //     ["Sorties", 200],
    //     ["Sports", 100]
    // ];
    //
    // const options = {
    //     title: "Somme dépensée par catégorie",
    // };

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        console.log(selectedBudget);
        const sendCategoryStats = async() => {
            const statList = await getcategoryStats({
                month: selectedBudget.month,
                year: selectedBudget.year
            })
            console.log(statList)
            setUpStats(statList.categoryStats)
        }
        sendCategoryStats()
        
    }

    function setUpStats(list: CategoryStats[]) {
        console.log(list);
        setCategoryStats(list);
    }

    useEffect(() => {
        console.log(categoryStats);
        if(categoryStats!= undefined && categoryStats.length!=0){
            const data: (string | number)[][] = [
                ["Category","Sum"]
            ]
            categoryStats.forEach(value => {
                const stat = [value.categoryName,value.totalAmount]
                data.push(stat)
            })
            if(selectedBudget.balanceRemaining>0) data.push(["Remaining budget",selectedBudget.balanceRemaining])

            const options = {
                title: `Dépenses et budget restant pour le ${selectedBudget.month}/${selectedBudget.year}`
            }
            setChart(<Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                />
            )
        }
    }, [categoryStats]);

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const budget = budgets.find((value) => value.id === parseInt(e.target.value));
        if (budget != undefined) setSelectedBudget(budget);
    }

    return (<>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="budget">Budget:</label>
                    <select name="selectedBudget" value={selectedBudget.id} onChange={handleChange}>
                        {budgets.map((budget) => {
                            return <option value={budget.id} key={budget.id}>{`${budget.month}/${budget.year}`}</option>
                        })}
                    </select>
                </div>
                <input type="submit"/>
            </form>
            <div className={"pieChartContainer"}>
                {chart}
            </div>
        </>
    );
}