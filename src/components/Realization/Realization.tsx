import { useState } from "react"
import { useDispatch } from "react-redux"
import './realization.css'

const Realization = () => {
    const [modalActive, setModalActive] = useState(false)

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchPurchases())
    // }, [])

    // const loading = useSelector(selectLoading)
    // const purchases = useSelector(selectPurchases)
    
    let content

    const columns = ["ID", "Контрагент", "Дата", "Сумма", "Статус"]

    // if (loading) {
    //     content = (<div>Загрузка...</div>)
    // } else {
    //     content = (
    //         <Table columns={columns} rows={purchases}/>
    //     )
    // }


    return(
        <div className="purchases">
            <div className="purchases__head">
                <h2 className="purchases__title">Продажи</h2>
                <button className="purchases__btn" onClick={() => setModalActive(true)}>
                    <div className="add-icon"/>
                    Реализацию
                </button>
            </div>
            
            {content}
            {/* <Modal active={modalActive} setActive={setModalActive}/> */}
        </div>
    )
}

export default Realization