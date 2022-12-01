import React, { Component } from 'react'
import { Outlet } from 'react-router-dom';
import ItemCard from './ItemCard';
import LoadingLogo from './LoadingLogo';

export class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            updating: false,
            pageNo: 1,
        };
    }
    async componentDidMount() {
        let url = "https://api.escuelajs.co/api/v1/products?offset=0&limit=9";
        this.setState({ updating: true })
        let data = await fetch(url);
        let finalData = await data.json();
        this.setState({
            items: finalData,
        })
        this.setState({ updating: false })
    }


    nextbtn = async () => {
        this.setState({
            pageNo: this.state.pageNo + 1,
        })
        let url = `https://api.escuelajs.co/api/v1/products?offset=${(this.state.pageNo - 1) * 9}&limit=9`;
        console.log(url)
        this.setState({ updating: true })
        let data = await fetch(url);
        let finalData = await data.json();
        this.setState({ items: finalData })
        this.setState({ updating: false })
    }

    prevbtn = async () => {
        this.setState({
            pageNo: this.state.pageNo - 1,
        })

        let url = `https://api.escuelajs.co/api/v1/products?offset=${(this.state.pageNo - 1) * 9}&limit=9`;
        this.setState({ updating: true })
        let data = await fetch(url);
        let finalData = await data.json();
        this.setState({ items: finalData })
        this.setState({ updating: false })
    }
    render() {
        const divstyle = {
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"

        }

        const pageStyle = {
            fontSize: "1.5rem",

        }

        return (

            <>
                <Outlet />
                <div>
                    <div div style={divstyle}>
                        <div style={{ width: "66rem", fontSize: "1.8rem", margin: "1rem" }}>
                            <b>Deals of the Day</b>
                        </div>
                        {this.state.updating && <LoadingLogo />}
                        <div style={{ display: "flex", flexWrap: "wrap", width: "66rem" }}>
                            {!this.state.loading && this.state.items.map((element) => {
                                return (

                                    <ItemCard title={element.title ? element.title : ""} price={element.price} imgSrc={element.images[0]} key={element.id} id={element.id} />
                                );
                            })}
                        </div>
                    </div >

                    <div className="d-flex justify-content-around" style={{ marginTop: "3rem", display: "flex" }}>

                        <button disabled={this.state.pageNo <= 1} onClick={this.prevbtn} type="button" className="btn btn-outline-dark">Previous</button>
                        <div style={pageStyle}>Page No. {this.state.pageNo}</div>
                        <button disabled={this.state.totalResults / 10 <= this.state.pageNo + 1} onClick={this.nextbtn} type="button" className="btn btn-outline-dark">Next</button>
                    </div>
                </div>
            </>
        );
    }
}

export default HomePage
