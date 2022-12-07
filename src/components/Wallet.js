import React, { Component } from 'react'

export class Wallet extends Component {
    constructor() {
        super();
        this.state = {
            ran: JSON.parse(localStorage.getItem("user")),
        };
    }

    addmoney = () => {
        let temp = this.state.ran;
        let amount = parseInt(document.getElementById('money').value)
        amount = parseInt(temp.walletBalance) + amount
        temp.walletBalance = amount
        localStorage.setItem("user", JSON.stringify(temp))
        window.location.reload()
    }

    componentDidMount() {
        if (localStorage.getItem("loginCheck") == "true") {
            document.getElementById('temp1').style.display = "block"
            document.getElementById('temp2').style.display = "none"
        } else {
            document.getElementById('temp1').style.display = "none"
            document.getElementById('temp2').style.display = "block"

        }
    }
    render() {

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

        const usStyle = {
            fontSize: "1.5rem",
            margin: "2rem"
        }

        const desc = {
            fontSize: "1.5rem",
            margin: "2rem",
            marginTop: "0rem"
        }
        const amt = {

            fontSize: "1.5rem"

        }

        const moneyStyle = {
            margin: "1rem"

        }
        return (
            <>
                <div id="temp2">
                    Please Login First To access the Wallet.

                </div>
                <div style={centerStyle} id="temp1">

                    <div style={usStyle}> Hello {this.state.ran.userId}.</div>
                    <div style={desc}>Your current wallet has</div>
                    <div style={amt}> ${this.state.ran.walletBalance}</div>


                    <button type="button" style={moneyStyle} class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Money
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">More Details To Register</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Enter Amount: <input type="number" id="money" placeholder="Enter Amount" />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-dark" onClick={() => this.addmoney()}>Add Amount</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </>
        )
    }
}

export default Wallet
