import { ICounterparty } from "./ICounterparty";
import { IIssueGoods } from "./IIssueGoods";

export interface IIssue {
    id?: number;
    counterparty: ICounterparty;
    date: string;
    totalPrice: number;
    status: string;
    issueGoods: IIssueGoods[];
}