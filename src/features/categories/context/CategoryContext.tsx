import {Category} from "../types/category.ts";
import {createContext, ReactNode, useContext, useEffect, useReducer} from "react";
import {fetchCategories} from "../services/category-service.ts";

export interface Action{
    type: string;
    category: Category;
}

export const CategoryContext = createContext<Category[]>([]);
export const CategoryDispatchContext = createContext<(action: Action) => void>(null!!);

function reducer(categories: Category[], action: Action) {
    switch (action.type) {
        case "add":
            return [...categories, action.category];
        case "update":
            return categories.map((c) => c.id === action.category.id ? action.category : c);
        default:
            throw Error(`Unknown action type ${action.type}`);
    }
}

export function CategoryProvider({children}: { children: ReactNode }) {
    const [category, dispatch] = useReducer(reducer,[]);

    useEffect(() => {
        const sendFetchCategories = async() => {

            const categories = await fetchCategories();
            categories.categoryOutputList.forEach((value) => dispatch({
                type: "add",
                category: value
            }))
        }
        sendFetchCategories();
    },[])

    return <>
        <CategoryContext.Provider value={category}>
            <CategoryDispatchContext.Provider value={dispatch}>
                {children}
            </CategoryDispatchContext.Provider>
        </CategoryContext.Provider>
    </>
}

export const useCategories = () => useContext(CategoryContext);
export const useCategoryDispatch = () => useContext(CategoryDispatchContext);