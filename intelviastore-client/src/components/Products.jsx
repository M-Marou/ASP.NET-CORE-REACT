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

    return (
        <>
        <div className="container text-center">
            <p className="lead">a product</p>
        </div>
        <form autoComplete="off" noValidate>
            <div className="card">
                <img src={values.ImageSrc} className="card-img-top"/>
                <div className="card-body">
                    <div className="form-group">
                        <input type="file" accept="image/*" className="form-control-file"
                            onChange={showPreview}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Product Name" name="productname" 
                            value={values.Name}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Product Description" name="productdecriptions" 
                            value={values.Description}
                            onChange={handleInputChange}/>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}