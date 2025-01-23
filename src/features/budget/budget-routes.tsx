import {Route} from "react-router";
import {BudgetLayout} from "./layouts/BudgetLayout.tsx";
import {SuspenseWrapper} from "../../shared/utils/SuspenseWrapper.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const validateIdLoader = async({params}) => {
    const id = params.id;
    if(!id || isNaN(Number(id)))
        throw new Response("Invalid Id", { status: 400});
    else return {id: Number(id)}
}

export default [
    <Route path={"budgets"} element={<BudgetLayout/>} key={"budget-layout"}>
        <Route index key={"manager"} element={
            <SuspenseWrapper key={"lazy-budget-form"} importFn={() => import("./components/BudgetManagerComponent.tsx")}/>
        }/>
        <Route path={"update/:id"} key={"update-budget"} loader={validateIdLoader} element={
            <SuspenseWrapper key={"lazy-update-budget"} importFn={() => import("./components/ModifyBudget/ModifyBudgetComponent.tsx")}/>
        }/>
    </Route>
]