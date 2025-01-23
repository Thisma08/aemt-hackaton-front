import {LoginComponent} from "./login/LoginComponent.tsx";
import {RegisterComponent} from "./register/RegisterComponent.tsx";
import './UserManagerComponent.css'
import {UserQuery} from "../types/UserQuery.ts";

export function UserManagerComponent() {
    const handleLogin = (user: UserQuery) => {
        console.log(user);
    }

    const handleRegister = (user: UserQuery) => {
        console.log(user);
    }

    return <div>
        <LoginComponent onLogin={handleLogin}/>
        <RegisterComponent onRegister={handleRegister}/>
    </div>
}