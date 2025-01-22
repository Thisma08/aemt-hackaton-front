import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Category} from "../../../categories/types/category.ts";
import {CreatePurchaseCommand} from "../../types/CreatePurchaseCommand.ts";
import {Budget} from "../../../budget/types/budget.ts";
import {fetchBudgets} from "../../../budget/services/budget-service.ts";
import {fetchCategories} from "../../../categories/services/category-service.ts";
import "./PurchaseFormComponent.css"

export interface PurchaseFormComponentProps{
    onPurchaseCreation: (purchase: CreatePurchaseCommand) => void;
}

export function PurchaseFormComponent({onPurchaseCreation}: PurchaseFormComponentProps){
    //Validation
    const [formValidation, setFormValidation] = useState<boolean>(false);
    function checkFormValidity() {
        if (inputs.amount>=0) {
            const budget = budgets.find((value)=> value.id === inputs.budgetId)
            if(budget!=undefined && budget.month === (inputs.purchaseDate.getMonth()+1) && budget.year === inputs.purchaseDate.getFullYear()){
                setFormValidation(true);
            }
            else setFormValidation(false);
        } else
            setFormValidation(false);
    }

    //Get budgets & categories
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const defaultCategory = useRef<Category>();
    const defaultBudget = useRef<Budget>();
    const fetchBudgetsAndCategories = async () => {
        const budgetList = await fetchBudgets()
        const categoryList = await fetchCategories()
        setBudgets(budgetList.Budgets)
        setCategories(categoryList.categoryOutputList)
    }
    fetchBudgetsAndCategories();
    const budgetOptions = budgets.map((budget: Budget) =>
        <option key={budget.id} value={budget.id}>{`${budget.month}/${budget.year} - ${budget.budget}`}</option>
    )
    const categoryOptions = categories.map((category: Category) =>
        <option key={category.id} value={category.id}>{category.name}</option>
    )

    //Input (change & submit)
    const [inputs, setInputs] = useState<CreatePurchaseCommand>({
        amount: 1,
        purchaseDate: new Date(),
        categoryID: 0,
        budgetId: 0
    })

    function checkIds() {
        if(categories.length > 0 && inputs.categoryID===0){
            defaultCategory.current = categories[0];
            inputs.categoryID = defaultCategory.current.id;
        }
        if(budgets.length > 0 && inputs.budgetId===0){
            defaultBudget.current = budgets[0];
            inputs.budgetId = defaultBudget.current.id;
        }
    }

    useEffect(() => {
        checkIds();
        checkFormValidity();
    }, [inputs])
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name,value,type} = e.target;
        if(type === "date")
            setInputs((values) => ({
                ...values,
                [name]: new Date(value)
            }))
        else setInputs((values) => ({
            ...values,
            [name]: parseInt(value, 10),
        }));
    }
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onPurchaseCreation(inputs);
        const form = e.target as HTMLFormElement;
        form.reset();
    }

    //Page
    const formatDate = (date: Date) => {
        // Formate l'objet Date en YYYY-MM-DD
        return date.toISOString().split("T")[0];
    };
    return <div className={"formWrapper"}>
        <form onSubmit={handleSubmit} className={"addPurchaseForm"}>
            <div className={"fieldContainer"}>
                <label htmlFor="amount">Prix de la transaction:</label>
                <input type="number" min={0} step={0.01} name={"amount"} value={inputs.amount} onChange={handleChange}/>
                <label className={"euroSigil"}>€</label>
            </div>
            <div className={"fieldContainer"}>
            <label>Date de l'achat: </label>
                <input type="date" name={"purchaseDate"} value={formatDate(inputs.purchaseDate)}
                           onChange={handleChange}/>
            </div>
            <div className={"fieldContainer"}>
                <select name="categoryID" value={inputs.categoryID} onChange={handleChange}>
                    {categoryOptions}
                </select>
            </div>
            <div className={"fieldContainer"}>
                <select name="budgetId" value={inputs.budgetId} onChange={handleChange}>
                    {budgetOptions}
                </select>
            </div>
            <div className={"submitContainer"}>
                <input type="submit" disabled={!formValidation} value="Purchase"/>
            </div>
        </form>
    </div>
}