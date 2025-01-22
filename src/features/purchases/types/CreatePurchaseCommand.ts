export interface CreatePurchaseCommand {
    amount: number;
    purchaseDate: Date;
    categoryID: number;
    budgetId: number;
}