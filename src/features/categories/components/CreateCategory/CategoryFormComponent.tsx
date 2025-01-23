import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./CategoryFormComponent.css"
import {Category} from "../../types/category.ts";
import {toast} from "react-toastify";

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
        if (inputs.name != "") {
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
        toast("Catégorie créée!")
    }

    return (
        <div className="formWrapper">
            <form onSubmit={handleSubmit} className="addCategoryForm">
                <table>
                    <tbody>
                    <tr>
                        <th colSpan={2}><label htmlFor="name">Categories</label></th>
                    </tr>
                    <tr>
                        <td><label htmlFor="name">Nom</label></td>
                        <td>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                minLength={1}
                                value={inputs.name}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <input
                                type="submit"
                                disabled={!formValidation}
                                value="Ajouter"
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}