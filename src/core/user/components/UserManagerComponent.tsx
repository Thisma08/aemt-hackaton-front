import {LoginComponent} from "./login/LoginComponent.tsx";
import {RegisterComponent} from "./register/RegisterComponent.tsx";
import './UserManagerComponent.css'
import {UserQuery} from "../types/UserQuery.ts";
import {useEffect, useState} from "react";
import {getAuthToken, getCurrentUser, login, logout, register} from "../services/user-service.ts";
import {toast} from "react-toastify";
import {User} from "../types/User.ts";

export function UserManagerComponent() {
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User>()
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const handleLogin = (user: UserQuery) => {
        const sendLogin = async () => {
            const jwtToken = await login(user)
            setToken(jwtToken);
        }
        sendLogin()
    }

    useEffect(() => {
        const localToken = getAuthToken();
        if(localToken!=null){
            setToken(localToken)
        }
    }, []);
    useEffect(() => {
        if (token != "" && token != undefined) {
            console.log(getCurrentUser());
            setIsConnected(true);
        }
        else setIsConnected(false);
    }, [token]);

    const handleRegister = (user: UserQuery) => {
        const sendRegister = async () => {
            const registered = await register(user);
            if (registered) toast("Utilisateur créé!");
        }
        sendRegister()
    }

    const handleLogout = () => {
        logout()
        setToken(undefined);
    }

    const login_register = <div>
        <LoginComponent onLogin={handleLogin}/>
        <RegisterComponent onRegister={handleRegister}/>
    </div>

    const logout_button = <div className={"disconnectWrapper"}>
        <button onClick={handleLogout}>Se déconnecter</button>
    </div>

    return isConnected ? logout_button : login_register;
}