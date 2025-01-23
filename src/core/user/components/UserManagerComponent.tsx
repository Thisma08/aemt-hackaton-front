import {LoginComponent} from "./login/LoginComponent.tsx";
import './UserManagerComponent.css'
import {UserQuery} from "../types/UserQuery.ts";
import {useEffect, useState} from "react";
import {getAuthToken, getCurrentUser, login, logout} from "../services/user-service.ts";
import {useNavigate} from "react-router";
import {useAuthDispatch} from "../../../shared/context/AuthContext.tsx";

export function UserManagerComponent() {
    const navigate = useNavigate();
    const dispatch = useAuthDispatch()
    const [token, setToken] = useState<string>();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const handleLogin = (user: UserQuery) => {
        const sendLogin = async () => {
            const jwtToken = await login(user)
            setToken(jwtToken);
            dispatch({
                type: "login",
                token: jwtToken
            });
        }
        sendLogin()
        navigate("/budgets")
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

    const handleLogout = () => {
        logout()
        setToken(undefined);
        dispatch({
            type: "logout",
            token: undefined
        });
    }

    function handleRegister() {
        navigate("/register");
    }

    const login_register = <div className={"loginContainer"}>
        <LoginComponent onLogin={handleLogin}/>
        <button onClick={handleRegister}>Go to register</button>
    </div>

    const logout_button = <div className={"disconnectWrapper"}>
        <button onClick={handleLogout}>Se déconnecter</button>
    </div>

    return isConnected ? logout_button : login_register;
}