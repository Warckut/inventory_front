import { ICounterparty } from "./ICounterparty";
import { IPurchasesGoods } from "./IPurchasesGoods";

export interface IPurchase {
    id?: number;
    counterparty: ICounterparty;
    date: string;
    totalPrice: number;
    status: string;
    purchasesGoods: IPurchasesGoods[];
}