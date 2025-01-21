import {Navigate, useLoaderData, useNavigate, useParams} from "react-router";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Budget} from "../../types/budget.ts";
import {fetchBudgetById, updateBudget} from "../../services/budget-service.ts";
import {useBudgetDispatch} from "../../context/BudgetContext.tsx";
import "./ModifyBudgetComponent.css";

export default function ModifyBudgetComponent() {
    const params = useParams()
    const [formValidation, setFormValidation] = useState<boolean>(false);
    const data = useLoaderData();
    const dispatch = useBudgetDispatch();
    const navigate = useNavigate();

    const id = Number(params.id);
    if(isNaN(id)){
        alert("Id erroné, retour à la liste de budgets...")
        return <Navigate to={"/budgets"} replace />
    }

    const [budget, setBudget] = useState<Budget>({
        id: 0,
        budget: 0,
        month: 0,
        year: 0,
        purchased: []
    });

    useEffect(() => {
        const sendFetchBudget = async() => {
            const budget = await fetchBudgetById(id);
            setBudget(budget);

            const date = new Date();

            if(budget.year < date.getFullYear()){
                alert("Vous ne pouvez pas modifier ce budget.")
                return <Navigate to={"/budgets"} replace />
            }
            else if(budget.year === date.getFullYear() && budget.month <= date.getMonth()){
                alert("Vous ne pouvez pas modifier ce budget.")
                return <Navigate to={"/budgets"} replace />
            }
        }
        sendFetchBudget();
    }, []);
    useEffect(() => {
        checkFormValidity()
    }, [budget]);

    console.log(budget)

    function sendUpdate() {
        const sendUpdateBudget = async () => {
            const response = await updateBudget({
                budget: budget.budget,
                month: budget.month,
                year: budget.year
            })
        }
        sendUpdateBudget()
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        sendUpdate();
        dispatch({
            type: "update",
            budget: budget
        })
        navigate("/budgets", { state: { reload: new Date().getTime() } });
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setBudget((values) => ({
            ...values,
            [name]: parseInt(value, 10),
        }));
    }

    function checkFormValidity() {
        if (budget.budget >= 500) {
            console.log("Budget is right");
            setFormValidation(true);
        } else
            setFormValidation(false);
    }

    return <form onSubmit={handleSubmit}>
        <div className={"modifyBudgetTitleContainer"}>
            <h2>Modifier le budget pour {budget.month}/{budget.year}</h2>
        </div>
        <h3></h3>
        <div className={"modifyBudgetFormWrapper"}>
            <div className={"modifyBudgetForm"}>
                <label htmlFor="budget">New amount:</label>
                <input type="number" min={"500"} name={"budget"} value={budget.budget} onChange={handleChange}/>
                <br/>
                <input type="submit" disabled={!formValidation}/>
            </div>
        </div>
    </form>
}