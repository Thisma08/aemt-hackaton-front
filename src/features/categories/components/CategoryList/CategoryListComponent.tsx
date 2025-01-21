import {useCategories} from "../../context/CategoryContext.tsx";
import "./CategoryListComponent.css";

export function CategoryListComponent(){
    const categories = useCategories();

    return (
        <div className={"categoryListContainer"}>
            <div className={"categoryListTitleContainer"}>
                <h2>Liste des catégories :</h2>
            </div>

            {categories.map((category) => (
                <div className={"categoryListItem"} key={`${category.name}`}>
                    {category.name}
                </div>
            ))}
        </div>
    );
}