import {PurchaseListComponent} from "./PurchaseList/PurchaseListComponent.tsx";
import {usePurchaseDispatch} from "../context/PurchaseContext.tsx";
import {CreatePurchaseCommand} from "../types/CreatePurchaseCommand.ts";
import {createPurchase} from "../services/purchase-service.ts";
import {PurchaseFormComponent} from "./PurchaseForm/PurchaseFormComponent.tsx";

export default function PurchaseManagerComponent() {
    const dispatch = usePurchaseDispatch();
    const handlePurchaseCreation = (purchase: CreatePurchaseCommand) => {
        const sendPurchase = async() => {
            const purchaseCreated = await createPurchase(purchase);
            dispatch({
                type: "add",
                purchase: {
                    id: purchaseCreated.id,
                    amount: purchaseCreated.amount,
                    category: purchaseCreated.category,
                    date: purchaseCreated.purchaseDate
                }
            })
        }
        sendPurchase()
    }

    return <>
        <PurchaseFormComponent onPurchaseCreation={handlePurchaseCreation}/>
        <img src={"garland.png"} alt={"garland-decoration"}
             style={{display: "block", margin: "20px auto", maxWidth: "20%", height: "auto"}}/>
        <PurchaseListComponent/>
    </>
}