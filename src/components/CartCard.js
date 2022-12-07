import React, { Component } from 'react'

export class CartCard extends Component {

    deletebtn = (id) => {
        localStorage.setItem("deletethis", id)
        window.location.reload()
    }

    render() {

        const cartOut = {
            display: "flex",
            width: "60rem",
            border: "2px solid black",
        }

        const innerTxt = {
            fontSize: "1.3rem",
            marginTop: "1.5rem",
            marginLeft: "2rem"

        }
        const innerTxtPrice = {
            fontSize: "1.3rem",
            marginLeft: "6rem"

        }
        const dte = {
            marginTop: "1rem",
            marginLeft: "2rem"
        }

        let { name, price, imgsrc, id } = this.props
        return (
            <>
                <div className="card mb-3" style={cartOut}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={imgsrc} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body" style={innerTxt}>
                                <p className="card-text">{name}</p>
                            </div>
                            <div style={innerTxtPrice}>${price}</div>
                            <button type="button" id="deletebtn" style={dte} className="btn btn-secondary" onClick={() => this.deletebtn(id)}>Delete Item</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CartCard
