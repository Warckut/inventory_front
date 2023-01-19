import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uploadFile } from '../../redux/purchasesReducer';
import FileUploaded from '../FileUploaded/FileUploaded';
import './modalImport.css'

const ModalImport = ({active, setActive}: any) => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const dispatch = useDispatch()

    const submitForm = () => {
        dispatch(uploadFile(selectedFile))
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}> 
                <span className="modal__title">Прикрепите файл</span>
                <form>
                    <FileUploaded
                        onFileSelect={(file: any) => setSelectedFile(file)}
                        // onFileSelectError={({ error }: any) => alert(error)}
                    />

                    <button className="modal__btn" onClick={submitForm}>Отправить</button>
                </form>
            </div>
        </div>
    )
}

export default ModalImport