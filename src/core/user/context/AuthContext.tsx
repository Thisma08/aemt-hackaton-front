import {UserQuery} from "../types/UserQuery.ts";
//import {createContext} from "react";

export interface Action{
    type: string;
    user: UserQuery;
}

//export const AuthContext = createContext<User>(undefined);