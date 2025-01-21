import {Route} from "react-router";
import {CategoryLayout} from "./layouts/CategoryLayout.tsx";
import {SuspenseWrapper} from "../../shared/utils/SuspenseWrapper.tsx";

export default [
    <Route path={"categories"} element={<CategoryLayout/>} key={"categories-layout"}>
        <Route index key={"manager"} element={
            <SuspenseWrapper key={"lazy-category-manager"} importFn={() => import("./components/CategoryManagerComponent.tsx")}/>
        }/>
    </Route>
]