import React, { useState } from "react";
import Navbar from './components/Navbar';
import Form from './components/Form';
import Notifications from './components/Notifications';
import EditModal from './components/EditModal';
export default function App() {
    const [title, settitle] = useState("")
    const [desc, setDesc] = useState("")
    const [notifications, setNotifications] = useState(getNotificationsFromLs)
    const [editId, seteditId] = useState("")
    localStorage.setItem("notifications", JSON.stringify(notifications))
    return (
        <>
            <EditModal editId={editId} notifications={notifications} setNotifications={setNotifications}/>
            <Navbar />
            <Form title={title} settitle={settitle} desc={desc} setDesc={setDesc} notifications={notifications} setNotifications={setNotifications} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="mb-3">Your Notifications</h2>
                        {
                            notifications.length === 0 ? <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Message:</h5>
                                    <p className="card-text">No notifications are available for reading.</p>
                                </div>
                            </div> : notifications.map((element) => {
                                return (
                                    <Notifications element={element} key={element.id} notifications={notifications} setNotifications={setNotifications} seteditId={seteditId}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
    function getNotificationsFromLs(){
        const notification=JSON.parse(localStorage.getItem("notifications"));
        if(notification){
            return notification
        }else{
            return [];
        }
    }
}
