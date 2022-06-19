import React from "react";

export default function EditModal({ editId, notifications, setNotifications }) {
    console.log(editId);
    const updateHandler = () => {
        const updateNotifications=notifications.map((elem) => {
            if (editId === elem.id) {
                return( {
                    ...elem, title: document.getElementById("edittitle").value,
                    desc: document.getElementById("editdesc").value
                })
            }else{
                return elem;
            }
        })
        console.log(updateNotifications);
        // setNotifications(updateNotifications);
    }
    return (
        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Notifications</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="edittitle" placeholder="Enter Your Title" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Description</label>
                                    <textarea name="desc" id="editdesc" rows="3" className="form-control" placeholder="Enter Your Notification"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateHandler()}>Edit Notifications</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}