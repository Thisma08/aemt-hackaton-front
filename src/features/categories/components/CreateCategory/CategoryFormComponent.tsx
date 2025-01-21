import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./CategoryFormComponent.css"
import {Category} from "../../types/category.ts";

export interface CategoryFormComponentProps {
    onCategoryCreation: (category: Category) => void
}

export function CategoryFormComponent({onCategoryCreation}: CategoryFormComponentProps) {
    const [formValidation, setFormValidation] = useState<boolean>(false);
    const [inputs, setInputs] = useState<Category>({
        id: 0,
        name: ""
    });

    function checkFormValidity() {
        if (inputs.name!="") {
            setFormValidation(true);
        } else
            setFormValidation(false);
    }

    useEffect(() => {
        checkFormValidity();
    }, [inputs])

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = event.target;
        setInputs((values) => ({
            ...values,
            [name]: value,
        }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onCategoryCreation({
            id: inputs.id,
            name: inputs.name,

        });
        const form = e.target as HTMLFormElement;
        form.reset();
    }

    return <div className="formWrapper">
        <form onSubmit={handleSubmit} className={"addCategoryForm"}>
            <div className={"fieldContainer"}>
                <label htmlFor="name">Nom de la catégorie:</label>
                <input type="text" minLength={1} name={"name"} value={inputs.name} onChange={handleChange}/>
            </div>
            <div className="submitContainer">
                <input type="submit" disabled={!formValidation} value={"Ajouter"}/>
            </div>
        </form>
    </div>
}