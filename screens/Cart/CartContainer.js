import React from "react";
import CartPresenter from "./CartPresenter";
import Loader from "../../components/Loader";
import { loadCart, vacateCart } from "../../utils";
import Notice from "../../components/Notice";
import Complete from "../../components/Complete";
import { NavigationEvents } from "react-navigation";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarOnPress: tab => {}
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cart: [],
      completeVisible: false
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

  _openComplete = () => {
    this.setState({
      completeVisible: true
    });
  };

  _closeComplete = () => {
    this.setState({
      completeVisible: false,
      cart: []
    });
    vacateCart();
  };

  test = async () => {
    console.log("test");
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
  };

  render() {
    const { cart, loading, completeVisible } = this.state;
    if (loading) return <Loader />;
    else if (cart === [] || cart.length === 0)
      return <Notice text="장바구니가 비어있습니다" />;
    else
      return (
        <>
          <NavigationEvents
            onWillFocus={payload => {
              this.test();
              //console.log("will focus", payload);
            }}
          />
          {loading ? (
            <Loader />
          ) : cart.length === 0 ? (
            <Notice text="장바구니가 비어있습니다" />
          ) : (
            <>
              <CartPresenter cart={cart} _openComplete={this._openComplete} />
              <Complete
                visible={completeVisible}
                _closeComplete={this._closeComplete}
                from={"order"}
                img={cart[0].image}
                start="Cart"
              />
            </>
          )}
        </>
      );
  }
}
