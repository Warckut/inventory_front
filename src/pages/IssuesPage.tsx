import { Button, message, Modal, Table, TableProps, Upload } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUploaded from '../components/FileUploaded/FileUploaded'
import { INomenclature } from '../models/INomenclature'
import { IPurchase } from '../models/IPurchase'
import { IPurchasesGoods } from '../models/IPurchasesGoods'
import { fetchIssues,  selectLoading, selectIssues } from '../redux/IssuesReducer'

const IssuesPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIssues())
    }, [])

    const loading = useSelector(selectLoading)
    const issues = useSelector(selectIssues)
    
    let content = null

    type IssuesGoodsTable = {
        key: number;
        name: string;
        count: number;
        price: number;
        unitMeasurement: string;
    }

    type IssuesTable = {
        key: number;
        counterparty: string;
        date: string;
        totalPrice: number;
        status: string;
        issuesGoods: IssuesGoodsTable[]
    };

    const columnsPurchases: ColumnsType<IssuesTable> = [
        { title: 'Контрагент', dataIndex: 'counterparty', key: 'counterparty' },
        { 
            title: 'Дата', 
            dataIndex: 'date', 
            key: 'date',
            render: (value: string) => (moment(value).format('DD.MM.yyyy HH:mm')),
            sorter: (a: any, b: any) => (Date.parse(a.date) -Date.parse(b.date)),
            
        },
        { title: 'Сумма', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Статус', dataIndex: 'status', key: 'status' },
    ];

    const columnsPurchasesGoods: ColumnsType<IssuesGoodsTable> = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Наименование', dataIndex: 'name', key: 'name' },
    { title: 'Количество', dataIndex: 'count', key: 'count' },
    { title: 'Сумма', dataIndex: 'price', key: 'price' },
    { title: 'Ед. Изм.', dataIndex: 'unitMeasurement', key: 'unitMeasurement' },
    ];
    
    if (loading) {
        content = (<div>Загрузка...</div>)
    } else {
        console.log(issues)
        const data: IssuesTable[] = issues.map( (issue: any, i) => {
            const issueGoods: IssuesGoodsTable[] = issue.issueGoods.map( (goodsItem: any, j: number) => {
                const nomenclature: INomenclature = goodsItem.name

                return {
                    key: j + 1,
                    name: nomenclature.name,
                    count: goodsItem.count,
                    price: goodsItem.price,
                    unitMeasurement: nomenclature.unitMeasurement }})
            
            const counterparty = issue.counterparty

            return {
                key: i + 1,
                counterparty: counterparty.name,
                date: issue.date,
                totalPrice: issue.totalPrice,
                status: issue.status,
                issuesGoods: issueGoods }})
        
        // const data: any = []
        content = (
            <Table columns={columnsPurchases}
                expandable={{
                    expandedRowRender: record => <Table style={{ margin: 5 }} pagination={false} columns={columnsPurchasesGoods} dataSource={record.issuesGoods}/>,
                    rowExpandable: record => record.issuesGoods !== [],
                }}
                dataSource={data}/>
        )}

    return (
        <div style={{padding: '2rem 5rem 5rem 5rem'}}>
            {content}
        </div>
    )
}



export default IssuesPage