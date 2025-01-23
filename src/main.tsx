import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import {AuthProvider} from "./shared/context/AuthContext.tsx";

const router = createBrowserRouter([
    {
        path: "*",
        element: <App/>
    }
]);

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
      <RouterProvider router={router}/>
  </AuthProvider>
)
