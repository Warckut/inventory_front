import { INomenclature } from "./INomenclature";

export interface IIssueGoods {
    id: number;
    name: INomenclature;
    count: number;
    price: number;
    unitMeasurements: string;
}