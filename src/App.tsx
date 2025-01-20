import './App.css'
import {NavigationBarComponent} from "./core/components/NavigationBar/NavigationBarComponent.tsx";
import {Route, Routes} from "react-router";
import {HomeComponent} from "./core/components/Home/HomeComponent.tsx";
import {NotFoundComponent} from "./core/components/NotFound/NotFoundComponent.tsx";
import budgetRoutes from "./features/budget/budget-routes.tsx";

function App() {

  return <>
    <NavigationBarComponent/>
    <main>
      <Routes>
        <Route index element={<HomeComponent/>}/>
        {budgetRoutes}
        <Route path={"*"} element={<NotFoundComponent/>}/>
      </Routes>
    </main>
  </>

}

export default App
