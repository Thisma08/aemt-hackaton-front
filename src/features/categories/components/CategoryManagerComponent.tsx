import {useCategories, useCategoryDispatch} from "../context/CategoryContext.tsx";
import {Category} from "../types/category.ts";
import {createCategory} from "../services/category-service.ts";
import {CategoryFormComponent} from "./CreateCategory/CategoryFormComponent.tsx";
import {CategoryListComponent} from "./CategoryList/CategoryListComponent.tsx";
import {toast} from "react-toastify";

export default function CategoryManagerComponent() {
    const dispatch = useCategoryDispatch()
    const categories = useCategories();
    const handleCategoryCreation = (category: Category) => {
        const duplication = categories.find((c) => c.name === category.name);
        if(duplication!=undefined) toast("Cette catégorie existe déjà!")
        else{
            const sendCategory = async() => {
                const categoryCreated = await createCategory(category.name);
                dispatch({
                    type: "add",
                    category: categoryCreated
                });
            }
            sendCategory()
        }
    }

    return <>
        <CategoryFormComponent onCategoryCreation={handleCategoryCreation}/>
        <img src={"garland.png"} alt={"garland-decoration"}
             style={{display: "block", margin: "20px auto", maxWidth: "20%", height: "auto"}}/>
        <CategoryListComponent/>
    </>
}