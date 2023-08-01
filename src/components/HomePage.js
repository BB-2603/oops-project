import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import ItemCard from "./ItemCard";
import LoadingLogo from "./LoadingLogo";

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
    let url = "http://localhost:8093/api/Items";
    this.setState({ updating: true });
    let data = await fetch(url);
    let finalData = await data.json();
    this.setState({
      items: finalData,
    });

    this.setState({ updating: false });
  }

  render() {
    const divstyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    };

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
              {!this.state.loading &&
                this.state.items.map((element) => {
                  return (
                    <ItemCard
                      name={element.name}
                      price={element.price}
                      imgSrc={element.image}
                      key={element._id}
                      id={element._id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
