
import React, { Component } from 'react'

export class ViewDetails extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            message: { display: "none" },
            image: [],
            id: 0,
        };
    }

    async componentDidMount() {
        let url = "http://localhost:8093/api/Items";
        let data = await fetch(url);
        let finalData = await data.json();
        for (const item in finalData) {
            if (Object.hasOwnProperty.call(finalData, item)) {
                const element = finalData[item];
                if (element.id == localStorage.getItem("tempthis")) {
                    this.setState({ items: element, image: element.image, id: element.id })
                    localStorage.removeItem("tempthis")
                    break
                }
            }
        }
        if (localStorage.getItem("loginCheck") == "false") {
            document.getElementById('AddtoCart').style.display = "block"
            document.getElementById('AddtoCart').disabled = "true"
            document.getElementById('DelteItm').style.display = "none"


        }

        else if (localStorage.getItem("logintype") == "customer") {
            document.getElementById('AddtoCart').style.display = "block"
            document.getElementById('DelteItm').style.display = "none"
        }
        else if (localStorage.getItem("logintype") == "admin") {
            document.getElementById('AddtoCart').style.display = "none"
            document.getElementById('DelteItm').style.display = "block"
        }


    }

    deleteItem = () => {
        let url = `http://localhost:8093/api/Items/${this.state.id}`
        let adminobj = JSON.parse(localStorage.getItem("admin"))
        fetch(url).then((response) => response.json())
            .then((data) => {

                let Url = "http://localhost:8093/api/Items/delete"

                let jsonvar = {
                    "item": data,
                    "Admin": adminobj
                }

                console.log(jsonvar);
                fetch(Url, {
                    mode: 'cors',
                    method: 'POST',
                    body: JSON.stringify(jsonvar),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {

                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });


        window.location.reload()
        window.location.assign("http://localhost:3000/admin")



    }
    addedItem = () => {
        this.setState({ message: { display: "block" } })
        setTimeout(() => {
            this.setState({ message: { display: "none" } })
        }, 1500);

        let cartItem = [this.state.items.name, this.state.items.price, this.state.image, this.state.id]
        let tempo = JSON.parse(localStorage.getItem("user"))
        if (tempo.cart.length == 0) {
            tempo.cart = []
            tempo.cart.push(cartItem)
            tempo.cartTotal = this.state.items.price
        }
        else {
            tempo.cart.push(cartItem)
            tempo.cartTotal += this.state.items.price
        }
        localStorage.setItem("user", JSON.stringify(tempo))

    }

    render() {
        const title = {
            fontSize: "3rem",
            marginLeft: "3rem",
            marginTop: "1.8rem"
        }
        const imageStyle = {
            backgroundColor: "black",
            marginLeft: "3rem",
            width: "30rem",
        }
        const descStyle = {
            fontSize: "1.5rem",
            marginLeft: "13.5rem",
            marginTop: "3.5rem",
        }

        const priceStyle = {
            fontSize: "1.5rem",
            width: "10rem",
            marginLeft: "13.5rem",
            marginTop: "1.2rem"
        }
        const flex = {
            display: "flex",
            marginTop: "1.5rem",

        }
        const flex2 = {
            display: "flex",
            marginTop: "2rem",
            flexDirection: "column"

        }
        const button = {
            marginLeft: "13.5rem",
            marginTop: "1.8rem",
            width: "8rem"

        }

        return (

            <div>
                <div className="alert alert-success" style={this.state.message} id="success" role="alert">
                    Your Item has been successfully added to cart.
                </div>
                <div style={title}>
                    {this.state.items.name}
                </div>
                <div style={flex}>

                    <div style={imageStyle}>
                        <img src={this.state.image} alt="" />

                    </div>
                    <div style={flex2}>
                        <div style={descStyle}>
                            About this item: <br />
                            {this.state.items.description}

                        </div>

                        <div style={priceStyle}>
                            ₹{this.state.items.price}

                        </div>

                        <button class="btn btn-outline-secondary" id="AddtoCart" style={button} onClick={() => this.addedItem()}>Add to Cart</button>
                        <button type="button" class="btn btn-danger" id="DelteItm" style={button} onClick={() => this.deleteItem()}>Delete Item</button>

                    </div>

                </div>
            </div>

        )
    }
}

export default ViewDetails
