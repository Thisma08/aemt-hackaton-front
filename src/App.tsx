import './App.css'
import {NavigationBarComponent} from "./core/components/NavigationBar/NavigationBarComponent.tsx";
import {Route, Routes} from "react-router";
import {HomeComponent} from "./core/components/Home/HomeComponent.tsx";
import {NotFoundComponent} from "./core/components/NotFound/NotFoundComponent.tsx";
import budgetRoutes from "./features/budget/budget-routes.tsx";
import categoriesRoutes from "./features/categories/categories-routes.tsx";
import purchasesRoutes from "./features/purchases/purchases-routes.tsx";
import statisticsRoutes from "./features/statistics/statistics-routes.tsx";
import {ToastContainer} from "react-toastify";

function App() {

  return <>
    <NavigationBarComponent/>
    <main>
      <Routes>
        <Route index element={<HomeComponent/>}/>
        {budgetRoutes}
        {categoriesRoutes}
        {purchasesRoutes}
        {statisticsRoutes}
        <Route path={"*"} element={<NotFoundComponent/>}/>
      </Routes>
    </main>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast"
    />
  </>
}

export default App
