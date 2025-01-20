import {Route} from "react-router";
import {BudgetLayout} from "./layouts/BudgetLayout.tsx";
import {SuspenseWrapper} from "../../shared/utils/SuspenseWrapper.tsx";

export default [
    <Route path={"budgets"} element={<BudgetLayout/>} key={"budget-layout"}>
        <Route index key={"manager"} element={
            <SuspenseWrapper key={"lazy-budget-form"} importFn={() => import("./components/BudgetManagerComponent.tsx")}/>
        }/>
    </Route>
]