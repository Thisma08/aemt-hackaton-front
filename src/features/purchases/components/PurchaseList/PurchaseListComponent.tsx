import {usePurchases} from "../../context/PurchaseContext.tsx";
import "./PurchaseListComponent.css";

export function PurchaseListComponent(){
    const purchases = usePurchases();

    const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className={"purchaseListContainer"}>
            <div className={"purchaseListTitleContainer"}>
                <h2>Liste des Transactions</h2>
            </div>

            <div>
                {sortedPurchases.map((purchase, index) => {
                    const purchaseDate = new Date(purchase.date);
                    const purchaseYear = purchaseDate.getFullYear();

                    const isFirstOfYear = index === 0 || purchaseYear !== new Date(sortedPurchases[index - 1].date).getFullYear();

                    return (
                        <div key={`${purchase.date}`}>
                            {isFirstOfYear && (
                                <div className={"yearContainer"}>
                                    <img src={"candy_cane_l.png"} alt={"candy_cane_l"}/>
                                    <h2 className="yearTitle">{purchaseYear}</h2>
                                    <img src={"candy_cane_r.png"} alt={"candy_cane_r"}/>
                                </div>
                            )}
                            <div className={"purchaseListItem"}>
                                <strong>{purchaseDate.toLocaleDateString()}</strong>
                                <br/>
                                {purchase.category}
                                <br/>
                                {purchase.amount} € dépensés.
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
