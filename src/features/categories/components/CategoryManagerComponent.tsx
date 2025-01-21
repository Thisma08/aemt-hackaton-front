import {useCategoryDispatch} from "../context/CategoryContext.tsx";
import {Category} from "../types/category.ts";
import {createCategory} from "../services/category-service.ts";
import {CategoryFormComponent} from "./CreateCategory/CategoryFormComponent.tsx";

export default function CategoryManagerComponent() {
    const dispatch = useCategoryDispatch()
    const handleCategoryCreation = (category: Category) => {
        const sendCategory = async() => {
            const categoryCreated = await createCategory(category.name);
            dispatch({
                type: "add",
                category: categoryCreated
            });
        }
        sendCategory()
    }

    return <>
        <CategoryFormComponent onCategoryCreation={handleCategoryCreation}/>
    </>
}