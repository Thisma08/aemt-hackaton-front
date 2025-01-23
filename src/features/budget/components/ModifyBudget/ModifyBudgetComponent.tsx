import {useNavigate, useParams} from "react-router";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Budget} from "../../types/budget.ts";
import {fetchBudgetById, updateBudget} from "../../services/budget-service.ts";
import {useBudgetDispatch} from "../../context/BudgetContext.tsx";
import "./ModifyBudgetComponent.css";
import {toast} from "react-toastify";

export default function ModifyBudgetComponent() {
    const params = useParams()
    const [formValidation, setFormValidation] = useState<boolean>(false);
    const dispatch = useBudgetDispatch();
    const navigate = useNavigate();

    const id = Number(params.id);
    if(isNaN(id)){
        toast("Id erroné, retour à la liste de budgets...");
        navigate("/budgets");
    }

    const [budget, setBudget] = useState<Budget>({
        id: 0,
        budget: 0,
        month: 0,
        year: 0,
        purchased: [],
        balanceRemaining: 0
    });

    useEffect(() => {
        const sendFetchBudget = async() => {
            const budget = await fetchBudgetById(id);
            setBudget(budget);

            const date = new Date();

            console.log(date);

            console.log(date.getFullYear());
            console.log(date.getMonth() + 1);

            console.log(budget.year);
            console.log(budget.month);


            if(budget.year < date.getFullYear()){
                toast("Vous ne pouvez pas modifier ce budget. Vous ne pouvez modifier que les budgets des mois futurs.")
                navigate("/budgets");
            }
            else if(budget.year === date.getFullYear() && budget.month <= date.getMonth() + 1){
                toast("Vous ne pouvez pas modifier ce budget. Vous ne pouvez modifier que les budgets des mois futurs.")
                navigate("/budgets");
            }
            else if(budget.year === date.getFullYear() && budget.month == date.getMonth() + 1){
                toast("Vous ne pouvez pas modifier ce budget. Vous ne pouvez modifier que les budgets des mois futurs.")
                navigate("/budgets");
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
            await updateBudget({
                budget: budget.budget,
                month: budget.month,
                year: budget.year
            });
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
    function getMonthName(month: number): string {
        switch (month) {
            case 1:
                return "janvier";
            case 2:
                return "février";
            case 3:
                return "mars";
            case 4:
                return "avril";
            case 5:
                return "mai";
            case 6:
                return "juin";
            case 7:
                return "juillet";
            case 8:
                return "août";
            case 9:
                return "septembre";
            case 10:
                return "octobre";
            case 11:
                return "novembre";
            case 12:
                return "décembre";
            default:
                return "Mois invalide"; // Gestion des cas inattendus
        }
    }


    return <>
        <div className={"modifyBudgetTitleContainer"}>
            <h2>Modifier le budget pour {getMonthName(budget.month)} {budget.year}</h2>
        </div>
        <div className={"modifyBudgetFormWrapper"}>
            <form className={"modifyBudgetForm"} onSubmit={handleSubmit}>
                <label className={"modifyBudgetFormLabel"} htmlFor="budget">Nouvelle valeur:</label>
                <input type="number" min={"500"} name={"budget"} value={budget.budget} onChange={handleChange}/>
                <br/>
                <input type="submit" disabled={!formValidation} value={"Envoyer"}/>
            </form>
        </div>
    </>
}