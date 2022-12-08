



import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class ItemCard extends Component {

    detailsPage = (element) => {
        localStorage.setItem("tempthis", element)

    };
    render() {
        let { imgSrc, name, price, id } = this.props;



        return (
            <div>
                <div className="card my-2" style={{ width: "18rem", marginLeft: "4rem" }}>
                    <img src={imgSrc} className="card-img-top" alt="..." width="500" height="300" />
                    <div className="card-body">
                        <h5 className="card-name">{name}</h5>
                        <p className="card-text">₹{price}</p>
                        <Link to="/Details" type="button" className="btn btn-outline-dark" onClick={() => this.detailsPage(id)}>View Details</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemCard
