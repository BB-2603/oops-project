import React, { Component } from 'react'

export class UserCard extends Component {

    deleteCustomer = (usnm, passd) => {
        let url = "http://localhost:8093/api/customer/deleteCustomer"
        let jsonvar = {
            "username": usnm,
            "pwd": passd
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
                console.log("successful");
            })
            .catch((err) => {
                console.log(err.message);
            });

        window.location.reload()
    }

    render() {
        let { name, phone, wallet, pass, userId } = this.props
        const userStyle = {
            border: "2px solid black",
            marginTop: "3rem",
            marginLeft: "10rem",
            width: "60rem"
        }
        return (
            <div>
                <div class="card" style={userStyle}>
                    <div class="card-body">
                        <div>
                            User ID: {userId}
                        </div>
                        <div>
                            Name: {name}
                        </div>
                        <div>
                            Password: {pass}
                        </div>
                        <div>
                            Wallet Amount: {wallet}
                        </div>
                        <div>
                            Contact Number: {phone}
                        </div>

                        <button type="button" class="btn btn-danger" style={{ marginTop: "1.5rem" }} onClick={() => { this.deleteCustomer(userId, pass) }}>Delete Customer</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserCard
