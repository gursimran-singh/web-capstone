import React from 'react';
import baseURL from "../../requestMethods.js";

const UploadImage = (props) => {
    const onSelectFile = async (event) => {
        const file = event.target.files[0];
        const convertedFile = await convertToBase64(file);
        
        const s3URL = await baseURL.post(
            '/image/upload',
            {
                image: convertedFile,
                name: file.name,
                type: file.type,
                section: props.section,
            }
        );
       props.updateField('image', s3URL.data.link);
    }
    const convertToBase64 = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
        })
    }
    return (
        <div>
            <input type="file" accept="image/*" onChange={onSelectFile}/>
        </div>
        
    )
}
export default UploadImage;