import React, { Component } from 'react';
import formatCurrency from './util';
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            addres: "",
            showCheckout: false,
        };
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    createOrder = (e) => {
        e.preventDefault();  //page is not going to refresh when user clicks on createorder
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };
    render() {
        const { cartItems } = this.props; /*we are getting cartitem from the parent component*/
        return (
            <div className="main-container">
                <div className="container-1">
                    {cartItems.length === 0 ? (
                        <div className="cart cart-header">Cart is Empty</div>
                    ) : (
                        <div className="cart cart-header">
                            You have {cartItems.length} in the cart{" "}
                        </div>
                    )}
                </div>
                <div className="container-2">
                    <div className="con-pt-a">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {cartItems.map((item) => (  /*convet cartitems into li */
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count}{" "}
                                                <button
                                                    className="button"
                                                    onClick={() => this.props.removeFromCart(item)}
                                                    style={{ marginLeft: "20px" }}> {/* the parameter is item */}
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    <div className="con-pt-b">
                        {cartItems.length !== 0 && (  //this line code is to remove the proceed button when there is no item in the cart
                            <div>
                                <div className="con-pt-b-1" >
                                    <div className="total">
                                        Total:{" "}
                                        {formatCurrency(
                                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                        )}
                                        {/* c = currentitem  band after setting the default value as 0 , formatcurrency = $ */}

                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                this.setState({ showCheckout: true });
                                            }}
                                            className="button primary">
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                                {this.state.showCheckout && (
                                    <Fade right cascade>
                                        <div className="cart">
                                            <form onSubmit={this.createOrder}>
                                                <ul className="form-container">
                                                    <li>
                                                        <label>Email</label>
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            required
                                                            onChange={this.handleInput}
                                                        ></input>
                                                    </li>
                                                    <li>
                                                        <label>Name</label>
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            required
                                                            onChange={this.handleInput}
                                                        ></input>
                                                    </li>
                                                    <li>
                                                        <label>Address</label>
                                                        <input
                                                            name="address"
                                                            type="text"
                                                            required
                                                            onChange={this.handleInput}
                                                        ></input>
                                                    </li>
                                                    <li>
                                                        <button className="button primary"
                                                            type="submit">
                                                            Checkout
                                                        </button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </Fade>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };
};
