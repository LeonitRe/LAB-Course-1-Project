import React, { useState, useEffect } from 'react'
import Trainer from './Trainer'
import axios from "axios";

export default function TrainerList() {
    const [trainerList, setTrainerList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        refreshTrainerList();
    }, [])

    const trainerAPI = (url = 'https://localhost:44310/api/Trainer/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshTrainerList() {
        trainerAPI().fetchAll()
            .then(res => {
                setTrainerList(res.data)
            })
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('trainerID') == "0")
            trainerAPI().create(formData)
                .then(res => {
                    onSuccess();
                    refreshTrainerList();
                })
                .catch(err => console.log(err))
        else
            trainerAPI().update(formData.get('trainerID'), formData)
                .then(res => {
                    onSuccess();
                    refreshTrainerList();
                })
                .catch(err => console.log(err))

    }

    const showRecordDetails = data => {
        setRecordForEdit(data)
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            trainerAPI().delete(id)
                .then(res => refreshTrainerList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} className="card-img-top rounded-circle" />
            <div className="card-body">
                <h5>{data.trainerName}</h5>
                <span>{data.occupation}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.trainerID))}>
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
                        <h1 className="display-4">Best Trainer</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <Trainer
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-8">
                <table>
                    <tbody>
                        {
                            //tr > 3 td
                            [...Array(Math.ceil(trainerList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(trainerList[3 * i])}</td>
                                    <td>{trainerList[3 * i + 1] ? imageCard(trainerList[3 * i + 1]) : null}</td>
                                    <td>{trainerList[3 * i + 2] ? imageCard(trainerList[3 * i + 2]) : null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
