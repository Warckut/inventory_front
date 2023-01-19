import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import './modalAddPurchase.css'

const ModalAddPurchase = ({active, setActive}: any) => {
    const dispatch = useDispatch()

    const submitForm = () => {
        
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}> 
                <span className="modal__title">Новый заказ</span>
                <form className="">
                    <div>Контрагент
                        <input type="text" id="theinput" name="theinput" />
                        <select name="thelist">
                            <option>one</option>
                            <option>two</option>
                            <option>three</option>
                        </select>
                    </div>
                    <div>Дата<input type="date"/></div>
                    <button className="modal__btn" onClick={submitForm}>Отправить</button>
                </form>
            </div>
        </div>
    )
}

export default ModalAddPurchase