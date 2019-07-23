import React from "react";
import CartPresenter from "./CartPresenter";
import { AsyncStorage } from "react-native";
import Loader from "../../components/Loader";
import { loadCart, vacateCart } from "../../utils";
import Notice from "../../components/Notice";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cart: []
    };
  }

  async componentDidMount() {
    let parsedCart;
    try {
      parsedCart = await loadCart();
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({
        loading: false,
        cart: parsedCart || []
      });
    }
  }

  render() {
    vacateCart();
    const { cart, loading } = this.state;
    if (loading) return <Loader />;
    else if (cart === [] || cart.length === 0)
      return <Notice text="장바구니가 비어있습니다" />;
    else return <CartPresenter cart={cart} />;
  }
}
