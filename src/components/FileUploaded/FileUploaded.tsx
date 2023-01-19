import { Button } from 'antd'
import React, {useRef} from 'react'

const FileUploader = ({onFileSelect}: any) => {
    const fileInput = useRef<HTMLInputElement>(null)

    const handleFileInput = (e: any) => {
        // handle validations
        onFileSelect(e.target.files[0])
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput}/>
            <Button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"/>
        </div>
    )
}

export default FileUploader