import React, { useState, useEffect } from 'react'
import Player from './Player';
import axios from 'axios';

export default function PlayerList() {
    const [playerList, setPlayerList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        refreshPlayerList();
    }, [])

    const playerAPI = (url = 'https://localhost:7133/api/Player/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshPlayerList() {
        playerAPI().fetchAll()
            .then(res => {
                setPlayerList(res.data)
            })
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('playerID') == "0")
            playerAPI().create(formData)
                .then(res => {
                    onSuccess();
                    refreshPlayerList();
                })
                .catch(err => console.log(err))
        else
            playerAPI().update(formData.get('playerID'), formData)
                .then(res => {
                    onSuccess();
                    refreshPlayerList();
                })
                .catch(err => console.log(err))

    }

    const showRecordDetails = data => {
        setRecordForEdit(data)
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            playerAPI().delete(id)
                .then(res => refreshPlayerList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} className="card-img-top rounded-circle" />
            <div className="card-body">
                <h5>{data.playerName}</h5>
                <span>{data.description}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.playerID))}>
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
                        <h1 className="display-4">Best Player</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <Player
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-8">
                <table>
                    <tbody>
                        {
                            //tr > 3 td
                            [...Array(Math.ceil(playerList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(playerList[3 * i])}</td>
                                    <td>{playerList[3 * i + 1] ? imageCard(playerList[3 * i + 1]) : null}</td>
                                    <td>{playerList[3 * i + 2] ? imageCard(playerList[3 * i + 2]) : null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}