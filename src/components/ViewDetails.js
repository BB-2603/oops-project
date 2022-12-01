
import React, { Component } from 'react'

export class ViewDetails extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            updating: false,
            message: { display: "none" },
            pageNo: 1,
            image: [],
        };
    }

    async componentDidMount() {
        let url = "https://api.escuelajs.co/api/v1/products?offset=0&limit=10";
        this.setState({ updating: true })
        let data = await fetch(url);
        let finalData = await data.json();
        for (const item in finalData) {
            if (Object.hasOwnProperty.call(finalData, item)) {
                const element = finalData[item];
                if (element.id == localStorage.getItem("tempthis")) {
                    this.setState({ items: element, image: element.images })

                    localStorage.clear();
                    break
                }
            }
        }

        this.setState({ updating: false })

    }
    addedItem = () => {
        this.setState({ message: { display: "block" } })
        setTimeout(() => {
            this.setState({ message: { display: "none" } })
        }, 1500);
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
                    {this.state.items.title}

                </div>
                <div style={flex}>

                    <div style={imageStyle}>
                        <img src={this.state.image[1]} alt="" />

                    </div>
                    <div style={flex2}>
                        <div style={descStyle}>
                            About this item: <br />
                            {this.state.items.description}

                        </div>

                        <div style={priceStyle}>
                            ${this.state.items.price}

                        </div>
                        <button class="btn btn-outline-secondary" style={button} onClick={() => this.addedItem()}>Add to Cart</button>


                    </div>

                </div>
            </div>

        )
    }
}

export default ViewDetails
