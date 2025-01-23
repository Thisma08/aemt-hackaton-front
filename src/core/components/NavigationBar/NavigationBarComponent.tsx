import {NavLink} from "react-router";
import "./NavigationBarComponent.css"

export function NavigationBarComponent() {
    return <nav className={"main-navigation-bar"}>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/budgets"}>Budgets</NavLink>
        <NavLink to={"/categories"}>Catégories</NavLink>
        <NavLink to={"/purchases"}>Transactions</NavLink>
        <NavLink to={"/pie-chart"}>Statistiques</NavLink>
        <NavLink to={"/"}>Se connecter/Changer de compte</NavLink>
    </nav>
}