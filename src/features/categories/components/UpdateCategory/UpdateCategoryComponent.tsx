import {useNavigate, useParams} from "react-router";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {useCategoryDispatch} from "../../context/CategoryContext.tsx";
import {Category} from "../../types/category.ts";
import {fetchCategoryById, updateCategory} from "../../services/category-service.ts";
import "./UpdateCategoryComponent.css"

export default function UpdateCategoryComponent(){
    const params = useParams();
    const [formValidation, setFormValidation] = useState<boolean>(false)
    const dispatch = useCategoryDispatch()
    const navigate = useNavigate();
    const initialNameRef = useRef<string>("");

    const id = Number(params.id);
    if(isNaN(id)){
        alert("Id erroné, retour à la liste de budgets...");
        navigate("/categories");
    }

    const [category, setCategory] = useState<Category>({
        id: 0,
        name: ""
    })

    useEffect(() => {
        const sendFetchCategory = async() => {
            const category = await fetchCategoryById(id)
            setCategory(category);
            initialNameRef.current = category.name;
        }
        sendFetchCategory()
    }, []);

    useEffect(() => {
        checkFormValidity()
    }, [category]);

    function checkFormValidity() {
        if (category.name!="") {
            setFormValidation(true);
        } else
            setFormValidation(false);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setCategory((values) => ({
            ...values,
            [name]: value,
        }));
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        sendUpdate();
        dispatch({
            type: "update",
            category: category
        })
        navigate("/categories", { state: { reload: new Date().getTime() } });
    }

    function sendUpdate() {
        const sendUpdateBudget = async () => {
            await updateCategory({
                id: category.id,
                name: category.name
            });
        }
        sendUpdateBudget()
        console.log(category);
    }

    return <form onSubmit={handleSubmit}>
        <div className={"updateCategoryTitleContainer"}>
            <h2>Modifier le nom de la catégorie {initialNameRef.current}</h2>
        </div>
        <h3></h3>
        <div className={"updateCategoryFormWrapper"}>
            <div className={"updateCategoryForm"}>
                <label htmlFor="name">New amount:</label>
                <input type="text" minLength={1} name={"name"} value={category.name} onChange={handleChange}/>
                <br/>
                <input type="submit" disabled={!formValidation}/>
            </div>
        </div>
    </form>
}