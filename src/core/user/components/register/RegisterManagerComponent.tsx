import {useNavigate} from "react-router";
import {UserQuery} from "../../types/UserQuery.ts";
import {register} from "../../services/user-service.ts";
import {toast} from "react-toastify";
import {RegisterComponent} from "./RegisterComponent.tsx";
import './RegisterManagerComponent.css'


export function RegisterManagerComponent() {
    const navigate = useNavigate();
    const handleRegister = (user: UserQuery) => {
        const sendRegister = async () => {
            const registered = await register(user);
            if (registered) toast("Utilisateur créé!");
        }
        sendRegister()
        navigate("/login")
    }

    function handleClick() {
        navigate("/login")
    }

    return <div className={"registerContainer"}>
        <RegisterComponent onRegister={handleRegister}/>
        <button onClick={handleClick}>Go to login</button>
    </div>
}