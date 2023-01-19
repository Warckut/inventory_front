import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IPurchase } from '../../models/IPurchase'
import { fetchPurchases, selectLoading, selectPurchases } from '../../redux/purchasesReducer'
import ModalAddPurchase from '../Modals/ModalAddPurchase'
import ModalImport from '../Modals/ModalImport'

import './purchases.css'

const Purchases = () => {
    const [modalImportActive, setModalImportActive] = useState(false)
    const [modalAddPurchaseActive, setModalAddPurchaseActive] = useState(false)
    const [productsNewPurchase, setProductsNewPurchase] = useState([])
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPurchases())
    }, [])

    const loading = useSelector(selectLoading)
    const purchases = useSelector(selectPurchases)
    
    let contentPurchases, contentNewPurchase;

    // const columnsPurchases = [
    //     {"ID"}, 
    //     "Контрагент", 
    //     "Дата", 
    //     "Сумма", 
    //     "Статус"
    // ]

    // if (loading) {
    //     contentPurchases = (<div>Загрузка...</div>)
    // } else {
    //     contentPurchases = (
    //         <Table columns={columnsPurchases} rows={purchases}/>
    //     )
    // }

    // const columnsNewPurchase = ["ID", "Наименование", "Количество", "Ед. Изм.", "Цена"];
    
    // contentNewPurchase = (
    //     <Table columns={columnsNewPurchase} rows={[]}/>
    // )

    return(
        <div className="purchases-page">
            <div className="purchases">
                <div className="purchases__head">
                    <h2 className="purchases__title">Закупки</h2>
                    {/* <button className="purchases__btn" onClick={() => setModalAddPurchaseActive(true)}>
                        <div className="add-icon"/>
                        Заказ
                    </button> */}
                </div>
                {/* {contentPurchases} */}
                
                {/* <ModalAddPurchase active={modalAddPurchaseActive} setActive={setModalAddPurchaseActive}/> */}
            </div>
            {/* <div className="new-purchase">
                <div className="new-purchase__head">
                    <h2 className="new-purchase__title">Новая закупка</h2>
                    <button className="purchases__btn" onClick={() => setModalImportActive(true)}>Импорт</button>
                </div>
                <form className="new-purchase__form">
                    <div className='new-purchase__counterparty'>Контрагент: 
                        <select name="thelist">
                            <option>one</option>
                            <option>two</option>
                            <option>three</option>
                        </select>
                    </div>
                    <div className='new-purchase__date'>Дата:<input type="date"/></div>
                    <div className='new-purchase__status'>Статус:<input /></div>
                    {contentNewPurchase}
                </form>
            </div> */}
            <ModalImport active={modalImportActive} setActive={setModalImportActive}/>
            <ModalAddPurchase active={modalAddPurchaseActive} setActive={setModalAddPurchaseActive}/>
        </div>
    )
}

export default Purchases

