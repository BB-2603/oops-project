import React, { Component } from "react";
import UserCard from "./UserCard";

export class Users extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    let url = "http://localhost:8093/api/userList";

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ items: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    const carthead = {
      fontSize: "2rem",
      margin: "1.5rem",
    };

    return (
      <div>
        <div style={carthead}>
          <b>These are all the Customers signed up on this project </b>
        </div>
        <div>
          {this.state.items.map((element) => {
            return (
              <UserCard
                name={element.name}
                userId={element.userId}
                wallet={element.walletBalance}
                pass={element.password}
                phone={element.phone}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Users;
