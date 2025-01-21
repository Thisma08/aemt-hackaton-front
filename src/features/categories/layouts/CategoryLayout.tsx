import {CategoryProvider} from "../context/CategoryContext.tsx";
import {Outlet} from "react-router";

export function CategoryLayout() {
    return <CategoryProvider>
        <Outlet/>
    </CategoryProvider>
}