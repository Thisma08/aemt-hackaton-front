import {usePurchaseDispatch, usePurchases} from "../../context/PurchaseContext.tsx";
import "./PurchaseListComponent.css";
import {useState} from "react";
import {deletePurchase} from "../../services/purchase-service.ts";
import {Purchase} from "../../types/Purchase.ts";

export function PurchaseListComponent(){
    const purchases = usePurchases();
    const dispatch = usePurchaseDispatch();

    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const [selectedMonth, setSelectedMonth] = useState("tous");
    const [selectedYear, setSelectedYear] = useState("tous");

    const years = [...new Set(purchases.map(p => new Date(p.date).getFullYear()))].sort((b, a) => a - b);

    const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const filteredPurchases = sortedPurchases.filter(purchase => {
        const matchesMonth = selectedMonth === "tous" || new Date(purchase.date).getMonth() === (parseInt(selectedMonth) - 1);
        const matchesYear = selectedYear === "tous" || new Date(purchase.date).getFullYear() === parseInt(selectedYear);
        return matchesMonth && matchesYear;
    });
    console.log(filteredPurchases);

    const handleDelete = async (id: number) => {
        const isConfirmed = confirm("Êtes-vous sûr(e) de vouloir supprimer cette transaction?");

        if (!isConfirmed) {
            return;
        }

        try {
            await deletePurchase(id);
            dispatch({
                type: "delete",
                purchase: { id } as Purchase
            });
        } catch (error) {
            console.error('Error deleting purchase:', error);
        }
    };

    return (
        <div className={"purchaseListContainer"}>
            <div className={"purchaseListTitleContainer"}>
                <h2>Liste des Transactions</h2>
            </div>

            <div className={"purchasefiltersContainer"}>
                <label>
                    Mois :
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="tous">Tous</option>
                        {months.map((month, index) => (
                            <option key={index} value={index + 1}>
                                {month}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Année :
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="tous">Toutes</option>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                {filteredPurchases.map((purchase, index) => {
                    const purchaseDate = new Date(purchase.date);
                    const purchaseYear = purchaseDate.getFullYear();

                    const isFirstOfYear = index === 0 || purchaseYear !== new Date(filteredPurchases[index - 1].date).getFullYear();

                    return (
                        <div key={`${purchase.date}_${purchase.id}`}>
                            {isFirstOfYear && (
                                <div className={"yearContainer"}>
                                    <img src={"candy_cane_l.png"} alt={"candy_cane_l"}/>
                                    <h2 className="yearTitle">{purchaseYear}</h2>
                                    <img src={"candy_cane_r.png"} alt={"candy_cane_r"}/>
                                </div>
                            )}
                            <div className={"purchaseListItem"}>
                                <strong>{purchaseDate.getDate()} {months[purchaseDate.getMonth()]} {purchaseDate.getFullYear()}</strong>
                                <br/>
                                {purchase.category}
                                <br/>
                                {purchase.amount} € dépensés.
                                <br/>
                                <button className={'deletePurchaseButton'} onClick={() => handleDelete(purchase.id)}>Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );}
