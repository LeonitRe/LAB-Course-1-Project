import React from "react";

export default function Form({title, settitle, desc, setDesc, notifications, setNotifications}) {
    const inputHandler=(e)=>{
        if(e.target.id==="title"){
            settitle(e.target.value)
        }else{
            setDesc(e.target.value)
        }
    }
    const addNotificationsHandler=(e)=>{
        e.preventDefault()
        if(title !== "" && desc !== ""){
            setNotifications((notification)=>{
                return(
                    [...notification, {
                        title:title,
                        desc:desc,
                        id:new Date().getTime()
                    }]
                )
            })
        }
        settitle("");
        setDesc("");
    }
    return (
        <>
            <div className="container my-3">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <form style={{border:"2px solid #ced4da", borderRadius:"10px", padding:"30px"}}>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" placeholder="Enter Your Title" value={title} onChange={inputHandler}/>
                                </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Notification</label>
                                <textarea name="desc" id="desc" rows="3" className="form-control" placeholder="Enter Your Notification" value={desc} onChange={inputHandler}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={addNotificationsHandler}>Add Notification</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}