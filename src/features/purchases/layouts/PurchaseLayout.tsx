import {Outlet} from "react-router";
import {PurchaseProvider} from "../context/PurchaseContext.tsx";

export function PurchaseLayout() {
    return <PurchaseProvider>
        <Outlet/>
    </PurchaseProvider>
}