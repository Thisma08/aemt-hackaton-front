import {NavLink} from "react-router";
import "./NavigationBarComponent.css"
import {useState} from "react";

export function NavigationBarComponent() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                <NavLink to={"/login"} onClick={toggleMenu}>Se connecter/Changer de compte</NavLink>
            </nav>
        </>
    );
}
