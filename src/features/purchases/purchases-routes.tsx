import {Route} from "react-router";
import {SuspenseWrapper} from "../../shared/utils/SuspenseWrapper.tsx";
import {PurchaseLayout} from "./layouts/PurchaseLayout.tsx";

export default [
    <Route path={"purchases"} element={<PurchaseLayout/>} key={"purchases-layout"}>
        <Route index key={"manager"} element={
            <SuspenseWrapper key={"lazy-purchase-manager"} importFn={() => import("./components/PurchaseManagerComponent.tsx")}/>
        }/>
    </Route>
]