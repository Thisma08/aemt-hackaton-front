import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {UserQuery} from "../../types/UserQuery.ts";

export interface RegisterComponentProps {
    onRegister: (user: UserQuery) => void;
}
export function RegisterComponent({onRegister}: RegisterComponentProps) {
    const [user,setUser] = useState<UserQuery>({
        username: "",
        password: ""
    })
    const [formValidation, setFormValidation] = useState<boolean>(false);

    function checkForm() {
        if(user.username!=""&&user.password!="") setFormValidation(true);
        else setFormValidation(false);
    }

    useEffect(() => {
        checkForm()
    }, [user]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onRegister(user)
        const form = e.target as HTMLFormElement;
        form.reset();
        setUser({
            username: "",
            password: ""
        });
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setUser((values) => ({
            ...values,
            [name]: value,
        }));

    }

    return <div className={"formWrapper"}>
        <form onSubmit={handleSubmit} className={"registerForm"}>
            <table>
                <tbody>
                <tr>
                    <th colSpan={2}><label htmlFor="register-user">Inscription</label></th>
                </tr>
                <tr>
                    <td><label htmlFor="register-username">Nom d'utilisateur</label></td>
                    <td>
                        <input
                            type="text"
                            id="register-username"
                            name="username"
                            minLength={1}
                            value={user.username}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="register-password">Mot de passe</label></td>
                    <td>
                        <input
                            type="password"
                            id="register-assword"
                            name="password"
                            minLength={1}
                            value={user.password}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <input
                            type="submit"
                            disabled={!formValidation}
                            value="S'inscrire"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>
}