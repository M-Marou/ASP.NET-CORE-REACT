import React, {useState, useEffect} from 'react';

const defaultImageSrc = '/img/product.jpg'
const initialFieldValues = {
    productID : 0,
    productName : '',
    description : '',
    imageSrc: defaultImageSrc,
    imageName: '',
    imageFile: null
}

export default function Products (props) {

    const {addOrEdit, recordForEdit} = props

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        if(recordForEdit != null)
        setValues(recordForEdit);
    },[recordForEdit])
    
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const showPreview = e =>{
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile:null,
                ImageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.productName = values.productName==""?false:true;
        temp.description = values.description==""?false:true;
        temp.imageSrc = values.imageSrc==defaultImageSrc?false:true;
        setErrors(temp)
        return Object.values(temp).every(x => x==true)
    } 

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if(validate()){
            const formData = new FormData()
            formData.append('productID', values.productID)
            formData.append('productName', values.productName)
            formData.append('description', values.description)
            formData.append('imageFile', values.imageFile)
            formData.append('imageName', values.imageName)
            addOrEdit(formData, resetForm)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field]==false)?' invalid-field':'')

    return (
        <>
        <div className="container text-center">
            <p className="lead">a product</p>
        </div>
        <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
            <div className="card">
                <img src={values.imageSrc} className="card-img-top" />
                <div className="card-body">
                    <div className="form-group p-2">
                        <input type="file" multiple="multiple" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                            onChange={showPreview} id="image-uploader" />
                    </div>
                    <div className="form-group p-2">
                        <input className={"form-control" + applyErrorClass('productName')} placeholder="Product Name" name="productName" 
                            value={values.productName}
                            onChange={handleInputChange} />
                    </div>
                    <div className="form-group p-2">
                        <input className={"form-control" + applyErrorClass('description')} placeholder="Product Description" name="description" 
                            value={values.description}
                            onChange={handleInputChange} />
                    </div>
                    <div className="form-group p-2 text-center">
                        <button type="submit" className="btn btn-outline-primary">Add Product</button>
                    </div>

                </div>
            </div>
        </form>
        </>
    )
}