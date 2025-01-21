import {GetAllCategories} from "../types/GetAllCategories.ts";
import {Category} from "../types/category.ts";

const API_CATEGORIES = import.meta.env.VITE_BASE_API_URL+"/v1/category";

export const fetchCategories: () => Promise<GetAllCategories> = async() => {
    const response = await fetch(API_CATEGORIES);
    return response.json();
}

export const fetchCategoryById: (id: number) => Promise<Category> = async(id: number) => {
    const response = await fetch(API_CATEGORIES+`/${id}`);
    return response.json();
}

export const createCategory: (output: string) => Promise<Category>
    = async (output: string) => {
    const response = await fetch(API_CATEGORIES,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(output)
    })
    const answer = await response.json();
    return {
        name: answer
    };
}
