import {NavLink} from "react-router";
import "./NavigationBarComponent.css"

export function NavigationBarComponent() {
    return <nav className={"main-navigation-bar"}>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/budgets"}>Budgets</NavLink>
    </nav>
}