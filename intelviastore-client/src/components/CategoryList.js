import React from 'react'
import Category from './Category'
import axios from "axios";

export default function CategoryList(){

    const CategoryAPI = (URL = '') => {
        return{
            fetchAll: () => axios.get(URL),
            create: newRecord => axios.post(URL, newRecord),
            update: (id, updatedRecord) => axios.put(URL + id, updatedRecord),
            delete: id => axios.delete(URL + id)
        }
    }

const addOrEdit = (FormData, onSuccess) =>{
    CategoryAPI().create(FormData)
    .then(res =>{
        onSuccess();
    })
    .catch(err => console.log(err))
}

    return(
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">Category Register</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
              <Category
                addOrEdit={addOrEdit}
              />
            </div>
            <div className="col-md-8">
                <div>List of Category records</div>
            </div>
        </div>
    )
}