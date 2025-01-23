import {createContext, ReactNode, useContext, useEffect, useReducer} from "react";
import {getAuthToken} from "../../core/user/services/user-service.ts";

export interface Action {
    type: string;
    token: string | undefined;
}

export const AuthContext = createContext<string | undefined>(undefined);
export const AuthDispatchContext = createContext<(action: Action) => void>(null!!);

function reducer(token: string | undefined, action: Action) {
    switch (action.type) {
        case "login":
            return action.token;
        case "logout":
            return undefined;
        default:
            throw Error(`Unknown action type ${action.type}`);
    }
}

export function AuthProvider({children}: { children: ReactNode }) {
    const [token, dispatch] = useReducer(reducer,undefined);
    useEffect(() => {
        const jwt = getAuthToken()
        if(jwt!=null) dispatch({
            type: "login",
            token: jwt
        })
    }, []);

    return <AuthContext.Provider value={token}>
        <AuthDispatchContext.Provider value={dispatch}>
            {children}
        </AuthDispatchContext.Provider>
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)