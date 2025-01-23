import {Budget} from "../../types/budget.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {CreateBudgetOutput} from "../../types/CreateBudgetOutput.ts";
import "./FormBudgetComponent.css"

export interface BudgetFormComponentProps{
    onBudgetCreation: (budget: Budget) => void;
    existingBudgets: Budget[];
}

export function FormBudgetComponent({onBudgetCreation, existingBudgets}: BudgetFormComponentProps) {
    const [formValidation, setFormValidation] = useState<boolean>(false);
    const [inputs, setInputs] = useState<CreateBudgetOutput>({
        budget: 500,
        month: 1,
        year: new Date().getFullYear()
    });

    function checkForDuplicates() {
        const duplicate = existingBudgets.some(
            (existingBudget) =>
                existingBudget.month === inputs.month && existingBudget.year === inputs.year
        );
        return duplicate;
    }

    function checkFormValidity() {
        if (inputs.budget > 0 && inputs.year >= 1980 && inputs.year <= new Date().getFullYear() + 1) {
            if (!checkForDuplicates()) {
                setFormValidation(true);
            } else {
                setFormValidation(false);
            }
        } else {
            setFormValidation(false);
        }
    }

    useEffect(() => {
        checkFormValidity();
    }, [inputs, existingBudgets]);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = event.target;
        setInputs((values) => ({
            ...values,
            [name]: parseInt(value, 10),
        }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onBudgetCreation({
            id: 0,
            budget: inputs.budget,
            month: inputs.month,
            year: inputs.year,
            purchased: [],
            balanceRemaining: 0
        });

        const form = e.target as HTMLFormElement;
        form.reset();
    }

    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]

    const years = Array.from(
        {length: new Date().getFullYear() - 2001 + 2},
        (_, i) => 2001 + i);

    return (
        <div className="formWrapper">
            <form onSubmit={handleSubmit} className="addBudgetForm">
                <table>
                    <tbody>
                    <tr>
                        <td><label htmlFor="budget">Budget:</label></td>
                        <td>
                            <input
                                type="number"
                                min="500"
                                name="budget"
                                value={inputs.budget}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="month">Mois:</label></td>
                        <td>
                            <select name="month" value={inputs.month} onChange={handleChange}>
                                {monthNames.map((monthName, index) => (
                                    <option key={monthName} value={index + 1}>{monthName}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="year">Année:</label></td>
                        <td>
                            <select name="year" value={inputs.year} onChange={handleChange}>
                                {years.map((year) => (
                                    <option key={`year_${year}`} value={year}>{year}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <input type="submit" disabled={!formValidation} value="Ajouter"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
