import React, { Component } from 'react'

export class EditItem extends Component {
    render() {
        const inp = {
            borderRadius: "0.5rem",
            margin: "1rem",
            marginLeft: "1rem",
            padding: "0.3rem",
            width: "15rem",
        };

        const centerStyle = {
            marginTop: "12rem",
            marginLeft: "32vw",
            display: "flex",
            width: "32rem",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid black"
        }
        return (
            <>

                <div style={centerStyle}>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label" >
                                New Title
                            </label>
                            <input style={inp} placeholder="Enter New Title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label" >
                                New Description
                            </label>
                            <textarea style={inp} placeholder="Enter New Description" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label" >
                                New Price
                            </label>
                            <input type="password" style={inp} id="pass" placeholder="Enter New Price" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default EditItem
