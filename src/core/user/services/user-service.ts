import {UserQuery} from "../types/UserQuery.ts";
import {toast} from "react-toastify";

const API_AUTH = import.meta.env.VITE_BASE_API_URL+"/v1/user"

export const login: (user: UserQuery) => Promise<string> = async(user:UserQuery) => {
    try{
        const response = await fetch(API_AUTH+"/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await response.json();
        if(response.ok){
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        }
        else{
            throw new Error(data.message || "Connexion râtée");
        }
    }
    catch (error){
        toast(`Erreur durant la connexion:${error.message}`);
    }
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const register: (user: UserQuery) => Promise<boolean> = async(user:UserQuery) => {
    try{
        const response = await fetch(API_AUTH+"/register",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await response.json();
        if(response.ok){
            return data;
        }
        else{
            throw new Error(data.message || "Inscription râtée");
        }
    }
    catch (error){
        toast("Erreur durant l'inscription:"+error.message);
    }
}

export const getCurrentUser = () => {
    try{
        const user = localStorage.getItem("user")
        if(user!=null)
            return JSON.parse(user);
        else throw new Error(`Tu n'es pas connecté.`);
    }
    catch(error){
        toast(error.message)
    }
}