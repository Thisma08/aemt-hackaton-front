import {Purchase} from "../types/Purchase.ts";
import {createContext, ReactNode, useContext, useEffect, useReducer} from "react";
import {fetchPurchases} from "../services/purchase-service.ts";

export interface Action{
    type: string;
    purchase: Purchase;
}

export const PurchaseContext = createContext<Purchase[]>([]);
export const PurchaseDispatchContext = createContext<(action: Action) => void>(null!!);

function reducer(purchases: Purchase[], action: Action) {
    switch (action.type) {
        case "add":
            return [...purchases, action.purchase];
        case "update":
            return purchases.map((p) => p.id === action.purchase.id ? action.purchase : p);
        default:
            throw Error(`Unknown action type ${action.type}`);
    }
}

export function PurchaseProvider({children}: { children: ReactNode }) {
    const [purchase, dispatch] = useReducer(reducer,[]);

    useEffect(() => {
        const sendFetchPurchases = async() => {

            const purchases = await fetchPurchases();
            console.log('Fetched purchases:', purchases);
            const normalizedPurchases = purchases.Purchasings.map((purchase) => ({
                ...purchase,
                date: new Date(purchase.date),
            }));

            normalizedPurchases.forEach((value) => dispatch({
                type: "add",
                purchase: value
            }))
        }
        sendFetchPurchases();
    },[])

    return <>
        <PurchaseContext.Provider value={purchase}>
            <PurchaseDispatchContext.Provider value={dispatch}>
                {children}
            </PurchaseDispatchContext.Provider>
        </PurchaseContext.Provider>
    </>
}

export const usePurchases = () => useContext(PurchaseContext);
export const usePurchaseDispatch = () => useContext(PurchaseDispatchContext);