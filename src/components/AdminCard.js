import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class AdminCard extends Component {

    detailsPage = (element) => {
        localStorage.setItem("tempthis", element)

    };

    changeItem = (element) => {
        let url = "http://localhost:8093/api/Items/modify"
        let name = document.getElementById('Itemname').value
        let price = document.getElementById('pricee').value
        let quantity = document.getElementById('Quantity').value
        let descri = document.getElementById('Description').value
        let img = document.getElementById('ImgLink').value
        let adminobj = JSON.parse(localStorage.getItem("admin"))

        let jsonvar = {
            "item": {
                "id": element,
                "name": name,
                "price": price,
                "quantity": quantity,
                "description": descri,
                "image": img
            },

            "Admin": adminobj
        }

        fetch(url, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(jsonvar),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ data: data })
            })
            .catch((err) => {
                console.log(err.message);
            });


        window.location.reload()

    }


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
                        <p className="card-text">₹{price}</p>
                        <Link to="/Details" type="button" className="btn btn-outline-dark" onClick={() => this.detailsPage(id)}>View Details</Link>
                        <button type="button" style={{ marginLeft: "2rem" }} class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#thisID">
                            Edit Item                        </button>

                        <div class="modal fade" id="thisID" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="Clse">Cancel</button>
                                        <button type="button" class="btn btn-dark" onClick={() => this.changeItem(id)}>Save changes</button>
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
