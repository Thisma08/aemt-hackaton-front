import {LoginComponent} from "./login/LoginComponent.tsx";
import {RegisterComponent} from "./register/RegisterComponent.tsx";
import './UserManagerComponent.css'

export function UserManagerComponent() {
    return <div>
        <LoginComponent/>
        <RegisterComponent/>
    </div>
}