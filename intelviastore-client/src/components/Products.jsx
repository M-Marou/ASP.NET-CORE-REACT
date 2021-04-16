import React, {useState, useEffect} from 'react';

const defaultImageSrc = '/img/product.jpg'
const initialFieldValues = {
    Id : 0,
    Name : '',
    Description : '',
    ImageSrc: defaultImageSrc,
    ImageFile: null
}

export default function Products () {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
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
                    ImageSrc: x.target.result
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
        temp.Name = values.Name==""?false:true;
        temp.ImageSrc = values.ImageSrc==defaultImageSrc?false:true;
        setErrors(temp)
        return Object.values(temp).every(x => x==true)
    } 
    const handleFormSubmit = e => {
        e.preventDefault()
        if(validate()){

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
                <img src={values.ImageSrc} className="card-img-top"/>
                <div className="card-body">
                    <div className="form-group">
                        <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('ImageSrc')}
                            onChange={showPreview}/>
                    </div>
                    <div className="form-group">
                        <input className={"form-control" + applyErrorClass('Name')} placeholder="Product Name" name="productname" 
                            value={values.Name}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <input className={"form-control" + applyErrorClass('Description')} placeholder="Product Description" name="productdecriptions" 
                            value={values.Description}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-outline-primary">Add Product</button>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}