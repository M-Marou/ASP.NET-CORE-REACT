import React from 'react'
import Products from './Products'
import axios from 'axios'


// const ProductsList = () => {
    export default function ProductsList(){

        const ProductsAPI = (url = 'https://localhost:44378/api/Products') => {
                return{
                    fetchall: () => axios.get(url),
                    create: newRecord => axios.post(url, newRecord),
                    update: (id, updateRecord) => axios.put(url + id, updateRecord),
                    delete: id  => axios.delete(url + id)
                }
            }
            
        const addOrEdit = (formData, onSuccess) => {
            ProductsAPI().create(formData)
            .then(res =>{
                onSuccess();
            })
            .catch(err => console.log(err))
        }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">Products register</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <Products
                    addOrEdit = {addOrEdit}
                />
            </div>               
            <div className="col-md-8">
                <div>List of products</div>
            </div>                            
        </div>
    )
}

// export default ProductsList
