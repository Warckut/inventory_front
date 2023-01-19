import {Button, Table, Modal} from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IProduct } from '../models/IProduct'
import { fetchProducts, selectLoading, selectProducts } from '../redux/productsReducer'

const ProductsPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const loading = useSelector(selectLoading)
    const products = useSelector(selectProducts)
    
    let content = null

    const columns = [
        { title: '№', width: '5rem', dataIndex: 'id', key: 'id' },
        { title: 'Наименование', dataIndex: 'name', key: 'age' },
        { title: 'Остаток', width: '10rem', dataIndex: 'count', key: 'count', align: 'right' as const },
        { title: 'Ед. Изм.', width: '10rem', dataIndex: 'unitMeasurements', key: 'unitMeasurements' }
      ];
    
    if (loading) {
        content = (<div>Загрузка...</div>)
    } else {
        const data = products.map( (el: IProduct, index) => {
            return {
                key: index + 1,
                id: index + 1,
                name: el.name.name,
                count: el.count,
                unitMeasurements: el.unitMeasurements,
            }
        })
        content = (
            <Table bordered columns={columns} dataSource={data}/>
        )
    }

    return (
        <div style={{padding: '5rem'}}>
            {content}
        </div>
    )
}

export default ProductsPage