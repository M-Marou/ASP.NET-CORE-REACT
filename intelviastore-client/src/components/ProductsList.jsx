import React from 'react'
import Products from './Products'


const ProductsList = () => {
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
                <Products/>
            </div>               
            <div className="col-md-8">
                <div>List of products</div>
            </div>                            
        </div>
    )
}

export default ProductsList
