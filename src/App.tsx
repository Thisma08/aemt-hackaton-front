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
import {UserManagerComponent} from "./core/user/components/UserManagerComponent.tsx";
import {useAuth} from "./shared/context/AuthContext.tsx";
import {useEffect, useState} from "react";
import {getCurrentUser} from "./core/user/services/user-service.ts";
import {RegisterManagerComponent} from "./core/user/components/register/RegisterManagerComponent.tsx";

function App() {
  const token = useAuth();
  const [userDiv, setUserDiv] = useState(<div></div>);

  useEffect(() => {
    if(token!=undefined){
      const user = getCurrentUser()
      if(user!=undefined) setUserDiv(<div className={"userDiv"}>
        Utilisateur: {user.username}
      </div>)
      else setUserDiv(<div></div>)
    }
    else setUserDiv(<div></div>)
  }, [token]);

  return <>
    {userDiv}
    <NavigationBarComponent/>
    <main>
      <Routes>
        <Route index element={<HomeComponent/>}/>
        {budgetRoutes}
        {categoriesRoutes}
        {purchasesRoutes}
        {statisticsRoutes}
        <Route path={"login"} element={<UserManagerComponent/>}/>
        <Route path={"register"} element={<RegisterManagerComponent/>}/>
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
