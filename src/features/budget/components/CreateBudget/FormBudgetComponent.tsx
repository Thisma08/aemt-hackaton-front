import {Budget} from "../../types/budget.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {CreateBudgetOutput} from "../../types/CreateBudgetOutput.ts";

export interface BudgetFormComponentProps{
    onBudgetCreation: (budget: Budget) => void
}

export function FormBudgetComponent({onBudgetCreation}: BudgetFormComponentProps){
    const [formValidation,setFormValidation] = useState<boolean>(false);
    const [inputs,setInputs] = useState<CreateBudgetOutput>({
        budget: 500,
        month: 1,
        year: new Date().getFullYear()
    });

    function checkFormValidity() {
        if(inputs.budget >= 500){
            console.log("Budget is right");
            if(inputs.year >= 1980 && inputs.year <= new Date().getFullYear()+1){
                console.log("Year is right");
                setFormValidation(true);
            }
            else
                setFormValidation(false);
        }
        else
            setFormValidation(false);
    }

    useEffect(() => {
        checkFormValidity();
    },[inputs])

    function handleChange(event: ChangeEvent<HTMLInputElement|HTMLSelectElement>){
        const { name, value } = event.target;
        setInputs((values) => ({
            ...values,
            [name]: parseInt(value, 10),
        }));
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        onBudgetCreation({
            id: 0,
            budget: inputs.budget,
            month: inputs.month,
            year: inputs.year,
            purchased: []
        });
        const form = e.target as HTMLFormElement;
        form.reset();
    }

    const monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ]

    const years = Array.from(
        {length: new Date().getFullYear()-2001+2},
    (_, i) => 2001 + i);

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="">
                <input type="number" min={"500"} name={"budget"} value={inputs.budget} onChange={handleChange}/>
            </label>
        </div>
        <div>
            <label htmlFor="">
                <select name="month" value={inputs.month} onChange={handleChange}>
                    {
                        monthNames.map((monthName,index) =>
                            <option key={monthName} value={index+1}>{monthName}</option>
                        )
                    }
                </select>
            </label>
        </div>
        <div>
            <label htmlFor="">
                <select name="year" value={inputs.year} onChange={handleChange}>
                    {
                        years.map((year) =>
                            <option key={"year_"+year} value={year}>{year}</option>
                        )
                    }
                </select>
            </label>
        </div>
        <input type="submit" disabled={!formValidation}/>
    </form>
}