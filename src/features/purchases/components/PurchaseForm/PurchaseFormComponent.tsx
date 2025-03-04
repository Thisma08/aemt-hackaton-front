import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Category} from "../../../categories/types/category.ts";
import {CreatePurchaseCommand} from "../../types/CreatePurchaseCommand.ts";
import {Budget} from "../../../budget/types/budget.ts";
import {fetchBudgets} from "../../../budget/services/budget-service.ts";
import {fetchCategories} from "../../../categories/services/category-service.ts";
import "./PurchaseFormComponent.css"
import {toast} from "react-toastify";

export interface PurchaseFormComponentProps {
    onPurchaseCreation: (purchase: CreatePurchaseCommand) => void;
}

export function PurchaseFormComponent({onPurchaseCreation}: PurchaseFormComponentProps) {
    // Validation
    const [formValidation, setFormValidation] = useState<boolean>(false);
    const [dateValidation, setDateValidation] = useState<boolean>(false);

    function checkFormValidity() {
        if (inputs.amount >= 0) {
            const budget = budgets.find((value) => value.id === inputs.budgetId);
            if (budget && budget.month === (inputs.purchaseDate.getMonth() + 1) && budget.year === inputs.purchaseDate.getFullYear()) {
                setDateValidation(true);
                setFormValidation(true);
            } else {
                setFormValidation(false);
                setDateValidation(false);
            }
        } else {
            setFormValidation(false);
        }
    }

    // Get budgets & categories
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showError, setShowError] = useState<boolean>(false);
    const defaultCategory = useRef<Category>();
    const defaultBudget = useRef<Budget>();

    useEffect(() => {
        const fetchBudgetsAndCategories = async () => {
            const budgetList = await fetchBudgets();
            const categoryList = await fetchCategories();
            setBudgets(budgetList.Budgets);
            setCategories(categoryList.categoryOutputList);
        };
        fetchBudgetsAndCategories();
    }, []);

    const budgetOptions = budgets.map((budget: Budget) =>
        <option key={budget.id} value={budget.id}>{`${budget.month}/${budget.year} - ${budget.budget}€`}</option>
    );
    const categoryOptions = categories.map((category: Category) =>
        <option key={category.id} value={category.id}>{category.name}</option>
    );

    // Input (change & submit)
    const [inputs, setInputs] = useState<CreatePurchaseCommand>({
        amount: 1,
        purchaseDate: new Date(),
        categoryID: 0,
        budgetId: 0
    });

    useEffect(() => {
        if (budgets.length > 0 && inputs.budgetId === 0) {
            const budgetActuel = budgets.find((budget) => {
                const date = new Date();
                return budget.month === (date.getMonth() + 1) && budget.year === date.getFullYear();
            });
            if (budgetActuel) {
                setInputs((values) => ({
                    ...values,
                    budgetId: budgetActuel.id
                }));
                defaultBudget.current = budgetActuel;
            } else {
                setInputs((values) => ({
                    ...values,
                    budgetId: budgets[0].id
                }));
                defaultBudget.current = budgets[0];
            }
        }
        if (categories.length > 0 && inputs.categoryID === 0) {
            setInputs((values) => ({
                ...values,
                categoryID: categories[0].id
            }));
            defaultCategory.current = categories[0];
        }
    }, [budgets, categories]);

    useEffect(() => {
        checkFormValidity();
    }, [inputs]);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setShowError(true);
        const {name, value, type} = e.target;
        if (type === "date") {
            setInputs((values) => ({
                ...values,
                [name]: new Date(value)
            }));
        } else {
            setInputs((values) => ({
                ...values,
                [name]: parseInt(value, 10)
            }));
        }
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onPurchaseCreation(inputs);
        const form = e.target as HTMLFormElement;
        form.reset();
        toast("Dépense créée!")
    }

    const formatDate = (date: Date) => {
        // Formate l'objet Date en YYYY-MM-DD
        return date.toISOString().split("T")[0];
    };

    return (
        <div className="formWrapper">
            <form onSubmit={handleSubmit} className="addPurchaseForm">
                <table>
                    <tbody>
                    <tr>
                        <td><label htmlFor="amount">Prix de la transaction:</label></td>
                        <td>
                            <input type="number" min="0" step="0.01" name="amount" value={inputs.amount} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="purchaseDate">Date de l'achat:</label></td>
                        <td>
                            <input type="date" name="purchaseDate" value={formatDate(inputs.purchaseDate)} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr style={{display: (!dateValidation && showError) ? 'table-row' : 'none'}}>
                        <td colSpan={2} className="errorContainer">La date ne correspond pas à la période du budget.</td>
                    </tr>
                    <tr>
                        <td><label htmlFor="categoryID">Catégorie de dépense:</label></td>
                        <td>
                            <select name="categoryID" value={inputs.categoryID} onChange={handleChange}>
                                {categoryOptions}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="budgetId">Budget concerné:</label></td>
                        <td>
                            <select name="budgetId" value={inputs.budgetId} onChange={handleChange}>
                                {budgetOptions}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="submitContainer">
                            <input type="submit" disabled={!formValidation} value="Ajouter" />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}