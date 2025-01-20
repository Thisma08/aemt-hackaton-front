import {NavLink} from "react-router";
import "./NavigationBarComponent.css"

export function NavigationBarComponent() {
    return <nav className={"main-navigation-bar"}>
        <NavLink to={"/"}>Home</NavLink>
        {/*<NavLink to={"/todos"}>Dashboard</NavLink>*/}
        {/*<NavLink to={"/todos/manager"}>Todos</NavLink>*/}
    </nav>
}