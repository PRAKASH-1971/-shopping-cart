//feature 1
import React from "react";
import "./index.css";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[], 
      size: "",
      sort: "",
    };
  }
  createOrder = (order) => {    //accepts order
    alert("Need to save Order for" + order.name);
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice(); 
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });  
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();  /* the Clone Copy of CartItems inside the State */
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {        
        alreadyInCart = true;
        item.count++
      }
    });
     if (!alreadyInCart) {
       cartItems.push({ ...product, count: 1 });
     }
     this.setState({ cartItems });  
     localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };
          //here we are using cartitems as a key and crtitems is a javascript object we are converting it into a string 


  sortProducts = (event) => {
    //implement
    console.log(event.target.value);
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
      .slice()
      .sort((a, b) => 
        sort === "lowest" 
        ? a.price > b.price //this command will sort from lowest to highest
          ? 1 
          : -1 
        :sort === "highest" 
        ? a.price < b.price //this command will sort from highest to lowest
         ? 1 
         : -1 
         : a._id < b._id 
         ? 1 
         : -1
         ),      
    }));
  };
  filterProducts = (event) => {
    //implement
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0 //we are making sure that this size exist in the array
        ),
      });
    }
  };

  render() {
    return (
      // <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
               products={this.state.products} addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
             <Cart
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
      // </Provider>
    );
  }
}

export default App;
