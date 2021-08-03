import React, { Component } from 'react';
import formatCurrency from './util';
import Fade from 'react-reveal/Fade';  //animation
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        }
    }
    // componentDidMount() {
    //     this.props.fetchProducts(); 
    // }
    openModal = (product) => {  //accepts product as a parameter
        this.setState({ product });
    };
    closeModal = () => {
        this.setState({ product: null });
    };
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>  {/*animation*/}
                {/* {!this.props.products ? (
                    <div>Loading...</div>
                ) : ( */}
                <ul className="products">
                {this.props.products.map((product) => (
                    <li key={product._id}>
                        <div className="product">
                            <a
                                href={"#" + product.id}
                                onClick={() => this.openModal(product)}  //uses product as a parameter
                            >
                                <img src={product.image} alt={product.title}></img>
                                <p>{product.title}</p>
                            </a>
                            <div className="product-price">
                                <div>{formatCurrency(product.price)}</div>
                                <button
                                    onClick={() => this.props.addToCart(product)}
                                    className="button primary"
                                > {/* we are passing current product as a parameter */}
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            );
                </Fade>
                {
                    product && ( //if product exists then show modal
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>
                                    x
                                </button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            Available Sizes:{" "}
                                            {product.availableSizes.map((x) => (
                                                <span>
                                                    {" "}
                                                    <button className="button">{x}</button>
                                                </span>
                                            ))}
                                        </p>
                                        <div className="product-price">
                                            <div>{formatCurrency(product.price)}</div>
                                            <button className="button primary" onClick={() => {
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}>
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )}
            </div>
        )
    }
}

// export default connect((state) => ({ products: state.products.items }), {
// fetchProducts
// })(Products);



