import {NavLink} from "react-router";
import "./NavigationBarComponent.css"
import {useEffect, useState} from "react";
import {getAuthToken} from "../../user/services/user-service.ts";
import {useAuth} from "../../../shared/context/AuthContext.tsx";

export function NavigationBarComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const auth = useAuth()

    useEffect(() => {
        checkConnected()
    }, [auth]);

    useEffect(() => {
        checkConnected()
    }, []);
    function checkConnected(){
        const jwtToken = getAuthToken();
        if(jwtToken!=null){
            setIsConnected(true);
        }
        else{
            setIsConnected(false);
        }
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const login_logout = isConnected ? "Se déconnecter" : "Se connecter/Changer de compte";

    return (
        <>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <nav className={`main-navigation-bar ${isOpen ? 'open' : ''}`}>
                <NavLink to={"/"} onClick={toggleMenu}>Home</NavLink>
                <NavLink to={"/budgets"} onClick={toggleMenu}>Budgets</NavLink>
                <NavLink to={"/categories"} onClick={toggleMenu}>Categories</NavLink>
                <NavLink to={"/purchases"} onClick={toggleMenu}>Transactions</NavLink>
                <NavLink to={"/pie-chart"} onClick={toggleMenu}>Statistiques</NavLink>
                <NavLink to={"/login"} onClick={toggleMenu}>{login_logout}</NavLink>
            </nav>
        </>
    );
}
