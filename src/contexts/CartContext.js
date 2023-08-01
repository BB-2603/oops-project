import React, { createContext, Component } from "react";

const cartContext = createContext();

export class CartContext extends Component {
  state = {
    total: JSON.parse(localStorage.getItem("user"))[0],
  };
  updateTotal = (newTotal) => {
    this.setState({
      total: newTotal,
    });
    console.log(this.state);
  };
  render() {
    const { total } = this.state;
    const { updateTotal } = this;
    return (
      <>
        <cartContext.Provider value={{ total, updateTotal }}>
          {this.props.children}
        </cartContext.Provider>
      </>
    );
  }
}

export default cartContext;
