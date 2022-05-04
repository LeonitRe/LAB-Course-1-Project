import React, { useState, useEffect } from 'react'
import Sukseset from './Sukseset';
import axios from 'axios';

export default function SuksesetList() {
    const [suksesetList, setSuksesetList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        refreshSuksesetList();
    }, [])

    const suksesetAPI = (url = 'https://localhost:5088/api/Sukseset/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshSuksesetList() {
        suksesetAPI().fetchAll()
            .then(res => {
                setSuksesetList(res.data)
            })
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('suksesetID') == "0")
            suksesetAPI().create(formData)
                .then(res => {
                    onSuccess();
                    refreshSuksesetList();
                })
                .catch(err => console.log(err))
        else
            suksesetAPI().update(formData.get('suksesetID'), formData)
                .then(res => {
                    onSuccess();
                    refreshSuksesetList();
                })
                .catch(err => console.log(err))

    }

    const showRecordDetails = data => {
        setRecordForEdit(data)
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            suksesetAPI().delete(id)
                .then(res => refreshSuksesetList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} className="card-img-top rounded-circle" />
            <div className="card-body">
                <h5>{data.suksesetName}</h5>
                <span>{data.description}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.suksesetID))}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )


    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">Sukseset Tona</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <Sukseset
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-8">
                <table>
                    <tbody>
                        {
                            //tr > 3 td
                            [...Array(Math.ceil(suksesetList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(suksesetList[3 * i])}</td>
                                    <td>{suksesetList[3 * i + 1] ? imageCard(suksesetList[3 * i + 1]) : null}</td>
                                    <td>{suksesetList[3 * i + 2] ? imageCard(suksesetList[3 * i + 2]) : null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}