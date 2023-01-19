import { INomenclature } from "./INomenclature";

export interface IPurchasesGoods {
    id: number;
    name: INomenclature;
    count: number;
    price: number;
    unitMeasurements: string;
}