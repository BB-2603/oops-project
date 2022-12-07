import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class AdminCard extends Component {

    detailsPage = (element) => {
        localStorage.setItem("tempthis", element)

    };
    render() {
        let { imgSrc, title, price, id } = this.props;

        const inp = {
            borderRadius: "0.5rem",
            width: "15rem",
            margin: "1rem",
            marginLeft: "1rem",
            padding: "0.3rem",
        }

        return (
            <div>
                <div className="card my-2" style={{ width: "18rem", marginLeft: "4rem" }}>
                    <img src={imgSrc} className="card-img-top" alt="..." width="500" height="300" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">${price}</p>
                        <Link to="/Details" type="button" className="btn btn-outline-dark" onClick={() => this.detailsPage(id)}>View Details</Link>
                        <button type="button" style={{ marginLeft: "2rem" }} class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Edit Item                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Credentials</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="mb-3" >
                                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                            <input id="Itemname" style={inp} aria-describedby="emailHelp" placeholder='Enter Item Name' />
                                        </div>
                                        <div className="mb-3" >
                                            <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                                            <input id="pricee" style={inp} aria-describedby="emailHelp" placeholder='Enter Price' />
                                        </div>
                                        <div className="mb-3" >
                                            <label htmlFor="exampleInputEmail1" className="form-label">Quantity</label>
                                            <input id="Quantity" style={inp} aria-describedby="emailHelp" placeholder='Enter Quantity' />
                                        </div>
                                        <div className="mb-3" >
                                            <label htmlFor="exampleInputEmail1" className="form-label">Image Link</label>
                                            <input id="ImgLink" style={inp} aria-describedby="emailHelp" placeholder='Enter Image Link' />
                                        </div>
                                        <div className="mb-3" >
                                            <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                                            <input id="Description" style={inp} aria-describedby="emailHelp" placeholder='Enter Description' />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-dark">Save changes</button>
                                        <button type="button" class="btn btn-danger">Delete Item</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminCard
