import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Modal, Table, TableProps, Upload } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUploaded from '../components/FileUploaded/FileUploaded'
import { INomenclature } from '../models/INomenclature'
import { IPurchase } from '../models/IPurchase'
import { IPurchasesGoods } from '../models/IPurchasesGoods'
import { fetchPurchases,  selectLoading, selectPurchases, uploadFile } from '../redux/purchasesReducer'

const PurchasesPage = () => {
    const dispatch = useDispatch();

    const [isModalUploadVisible, setIsModalUploadVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();

    const showModal = () => {
        setIsModalUploadVisible(true)
    };
    
    const handleOk = () => {
        dispatch(uploadFile(selectedFile))
        setIsModalUploadVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalUploadVisible(false)
    };

    useEffect(() => {
        dispatch(fetchPurchases())
    }, [])

    const loading = useSelector(selectLoading)
    const purchases = useSelector(selectPurchases)
    
    let content = null

    // const deleteHandler = (purhcaseKey: number) => {
    //     // console.log(purchases[purhcaseKey - 1].id)
    //     dispatch(removePurchase(purchases[purhcaseKey - 1].id))
    //     setRequestData(new Date())
    // }

    type PurchasesGoodsTable = {
        key: number;
        name: string;
        count: number;
        price: number;
        unitMeasurement: string;
    }

    type PurchasesTable = {
        key: number;
        counterparty: string;
        date: string;
        totalPrice: number;
        status: string;
        purchasesGoods: PurchasesGoodsTable[]
    };

    const columnsPurchases: ColumnsType<PurchasesTable> = [
        // { title: 'ID', dataIndex: 'id', key: 'id' },
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

    const columnsPurchasesGoods: ColumnsType<PurchasesGoodsTable> = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Наименование', dataIndex: 'name', key: 'name' },
    { title: 'Количество', dataIndex: 'count', key: 'count' },
    { title: 'Сумма', dataIndex: 'price', key: 'price' },
    { title: 'Ед. Изм.', dataIndex: 'unitMeasurement', key: 'unitMeasurement' },
    ];
    
    if (loading) {
        content = (<div>Загрузка...</div>)
    } else {
        const data: PurchasesTable[] = purchases.map( (purchase: IPurchase, i) => {
            const purchasesGoods: PurchasesGoodsTable[] = purchase.purchasesGoods.map( (goodsItem: IPurchasesGoods, j) => {
                const nomenclature: INomenclature = goodsItem.name
                console.log(nomenclature)
                return {
                    key: j + 1,
                    name: nomenclature.name,
                    count: goodsItem.count,
                    price: goodsItem.price,
                    unitMeasurement: nomenclature.unitMeasurement }})
            const counterparty = purchase.counterparty
            return {
                key: i + 1,
                counterparty: counterparty.name,
                date: purchase.date,
                totalPrice: purchase.totalPrice,
                status: purchase.status,
                purchasesGoods: purchasesGoods }})

        content = (
            <Table columns={columnsPurchases}
                expandable={{
                    expandedRowRender: record => <Table style={{ margin: 5 }} pagination={false} columns={columnsPurchasesGoods} dataSource={record.purchasesGoods}/>,
                    rowExpandable: record => record.purchasesGoods !== [],
                }}
                dataSource={data}/>
        )
    }

    return (
        <div style={{padding: '2rem 5rem 5rem 5rem'}}>
            <Button type='primary' style={{marginBottom: '2rem'}} onClick={showModal}>Импорт</Button>
            <Modal
                visible={isModalUploadVisible}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Submit
                    </Button>
            ]}>
                <FileUploaded
                        onFileSelect={(file: any) => setSelectedFile(file)}
                        // onFileSelectError={({ error }: any) => alert(error)}
                />
            </Modal>
            {content}
        </div>
    )
}



export default PurchasesPage