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

        const token = await response.text();
        if(response.ok){
            localStorage.setItem("token",token);
            return token;
        }
        else{
            throw new Error("Connexion râtée");
        }
    }
    catch (error){
        toast(`Erreur durant la connexion:${error.message}`);
    }
}

export const logout = () => {
    localStorage.removeItem("token");
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
        const token = localStorage.getItem("token")
        if(token) {
            const user = parseJwt(token);
            return {
                id: user.userId,
                username: user.sub,
            };
        }
        else throw new Error(`Tu n'es pas connecté.`);
    }
    catch(error){
        toast(error.message)
    }
}

export const getAuthToken= () => {
    return localStorage.getItem("token");
}

const parseJwt=(token:string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        throw new Error("Token invalide");
    }
}

export const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        if (response.status === 401) {
            logout(); // Déconnecter si le token est invalide
            toast("Session expirée, veuillez vous reconnecter.");
            window.location.reload();
        }
    }

    return response;
}