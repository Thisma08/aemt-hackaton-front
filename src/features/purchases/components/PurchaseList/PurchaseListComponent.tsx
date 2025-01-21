import {usePurchases} from "../../context/PurchaseContext.tsx";
import "./PurchaseListComponent.css";

export function PurchaseListComponent(){
    const purchases = usePurchases();

    return (
        <div className={"purchaseListContainer"}>
            <div className={"purchaseListTitleContainer"}>
                <h2>Liste des Transactions</h2>
            </div>

            {purchases.map((purchase) => (
                <div className={"purchaseListItem"} key={`${purchase.date}`}>
                    <strong>{new Date(purchase.date).toLocaleDateString()}</strong>
                    <br/>
                    {purchase.category}
                    <br/>
                    {purchase.amount} € dépensés.
                </div>
            ))}
        </div>
    );
}
