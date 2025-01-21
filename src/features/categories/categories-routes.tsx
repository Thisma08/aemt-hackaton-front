import {Route} from "react-router";
import {CategoryLayout} from "./layouts/CategoryLayout.tsx";
import {SuspenseWrapper} from "../../shared/utils/SuspenseWrapper.tsx";

const validateIdLoader = async({params}) => {
    const id = params.id;
    if(!id || isNaN(Number(id)))
        throw new Response("Invalid Id", { status: 400});
    else return {id: Number(id)}
}

export default [
    <Route path={"categories"} element={<CategoryLayout/>} key={"categories-layout"}>
        <Route index key={"manager"} element={
            <SuspenseWrapper key={"lazy-category-manager"} importFn={() => import("./components/CategoryManagerComponent.tsx")}/>
        }/>
        <Route path={"update/:id"} key={"update-category"} loader={validateIdLoader} element={
            <SuspenseWrapper key={"lazy-update-category"} importFn={() => import("./components/UpdateCategory/UpdateCategoryComponent.tsx")}/>
        }/>
    </Route>
]