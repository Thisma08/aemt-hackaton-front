import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Category} from "../../../categories/types/category.ts";
import {CreatePurchaseCommand} from "../../types/CreatePurchaseCommand.ts";
import {Budget} from "../../../budget/types/budget.ts";
import {fetchBudgets} from "../../../budget/services/budget-service.ts";
import {fetchCategories} from "../../../categories/services/category-service.ts";

export interface PurchaseFormComponentProps{
    onPurchaseCreation: (purchase: CreatePurchaseCommand) => void;
}

export function PurchaseFormComponent({onPurchaseCreation}: PurchaseFormComponentProps){
    //Validation
    const [formValidation, setFormValidation] = useState<boolean>(false);
    function checkFormValidity() {
        if (inputs.amount>=0) {
            setFormValidation(true);
        } else
            setFormValidation(false);
    }

    //Get budgets & categories
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
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
    useEffect(() => {
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
        console.log(inputs)
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Prix de la transaction</label>
                <input type="number" min={0} step={0.01} name={"amount"} value={inputs.amount} onChange={handleChange}/>
                <label>€</label>
            </div>
            <div>
                <label>
                    <input type="date" name={"purchaseDate"} value={formatDate(inputs.purchaseDate)}
                           onChange={handleChange}/>
                </label>
            </div>
            <select name="categoryID" value={inputs.categoryID} onChange={handleChange}>
                {categoryOptions}
            </select>
            <select name="budgetId" value={inputs.budgetId} onChange={handleChange}>
                {budgetOptions}
            </select>
            <input type="submit" disabled={!formValidation} value="Purchase"/>
        </form>
    </div>
}