import {useCategories} from "../../context/CategoryContext.tsx";
import "./CategoryListComponent.css";
import {useState} from "react";

export function CategoryListComponent(){
    const categories = useCategories();
    const [searchKeyWord, setSearchKeyWord] = useState("");

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchKeyWord.toLowerCase())
    );

    return (
        <div className={"categoryListContainer"}>
            <div className={"categoryListTitleContainer"}>
                <h2>Liste des catégories :</h2>
            </div>

            <div className={"filterContainer"}>
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Rechercher une catégorie..."
                    value={searchKeyWord}
                    onChange={(e) => setSearchKeyWord(e.target.value)}
                />
            </div>


            {filteredCategories.map((category) => (
                <div className={"categoryListItem"} key={`${category.name}`}>
                    {category.name}
                </div>
            ))}
        </div>
    );
}