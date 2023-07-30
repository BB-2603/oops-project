import React, { Component } from "react";

export class UserCard extends Component {
  deleteCustomer = (usnm) => {
    let url = `http://localhost:8093/api/deleteUser/${usnm}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    window.location.reload();
  };

  render() {
    let { name, phone, wallet, pass, userId } = this.props;
    const userStyle = {
      border: "2px solid black",
      marginTop: "3rem",
      marginLeft: "10rem",
      width: "60rem",
    };
    return (
      <div>
        <div className="card" style={userStyle}>
          <div className="card-body">
            <div>User ID: {userId}</div>
            <div>Name: {name}</div>
            <div>Password: {pass}</div>
            <div>Wallet Amount: {wallet}</div>
            <div>Contact Number: {phone}</div>

            <button
              type="button"
              className="btn btn-danger"
              style={{ marginTop: "1.5rem" }}
              onClick={() => {
                this.deleteCustomer(userId);
              }}>
              Delete Customer
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
