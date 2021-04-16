import React, { useState, useEffect } from 'react'

const defaultImageSrc = '/img/categoryicon.png'

const initialFieldValues = {
    CategoryId: 0,
    CategoryName:'',
    ImageName: '',
    ImageSrc: defaultImageSrc,
    ImageFile: null
}

export default function Category(props){

    const {addOrEdit} = props

const [values, setValues] = useState(initialFieldValues)
const [errors, setErrors]= useState({})

const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
        ...values,
        [name]:value
    })
}

const showPreview = e =>{
    if(e.target.files && e.target.files[0]){
        let ImageFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = x=>{
            setValues({
                ...values,
                ImageFile,
                ImageSrc: x.target.result
            })
        }
        reader.readAsDataURL(ImageFile)
    }
    else{
        setValues({
            ...values,
            ImageFile:null,
            ImageSrc: defaultImageSrc
        })
    }
}


const Validate =()=>{
    let temp= {}
    temp.CategoryName = values.CategoryName==""?false:true;
    temp.ImageSrc = values.ImageSrc==defaultImageSrc?false:true;
    setErrors(temp)
    return Object.values(temp).every(x => x==true)
}

const resetForm = ()=>{
    setValues(initialFieldValues)
    document.getElementById('image-uploader').value = null;
    setErrors({})
}


const handleFormSubmit = e =>{
    e.preventDefault()
    if(Validate()){

        const formData = new FormData()
        formData.append('CategoryId', values.CategoryId)
        formData.append('CategoryName', values.CategoryName)
        formData.append('ImageName', values.ImageName)
        formData.append('ImageFile', values.ImageFile)
        addOrEdit(formData, resetForm)
       
    }
}


const applyErrorClass = field => ((field in errors && errors[field]==false)?' invalid-field':'')

    return(
        <>
        <div className="container text-center">
            <p className="lead">Category</p>
        </div>
        <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
            <div className="card">
                <img src={values.ImageSrc} className="card-img-top" />
                <div className="card-body">
                    <div className="form-group">
                        <input type="file" accept="image/*" className={"form-control-file"+applyErrorClass('ImageSrc')}
                        onChange={showPreview} id="image-uploader" />
                    </div>
                    <div className="form-group">
                        <input className={"form-control"+applyErrorClass('CategoryName')} placeholder="Category Name" name="CategoryName"
                        value={values.CategoryName} 
                        onChange = {handleInputChange}/>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-light">submit</button> 
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}