import { INomenclature } from "./INomenclature";

export interface IProduct {
    id: number;
    name: INomenclature;
    count: number;
    unitMeasurements: string;
}