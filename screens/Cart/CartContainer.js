import React from "react"
import styled from "styled-components"
import CartPresenter from "./CartPresenter"
import Loader from "../../components/Loader"
import { loadCart, vacateCart } from "../../utils"
import Notice from "../../components/Notice"
import Complete from "../../components/Complete"
import { NavigationEvents } from "react-navigation"

const Refresh = styled.TouchableOpacity`
  flex: 1;
`
export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarOnPress: tab => {}
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      cart: [],
      completeVisible: false
    }
  }

  async componentDidMount() {
    let parsedCart
    try {
      parsedCart = await loadCart()
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({
        loading: false,
        cart: parsedCart || []
      })
    }
  }

  _update = cart => {
    this.setState({
      cart: cart
    })
  }

  _openComplete = () => {
    this.setState({
      completeVisible: true
    })
  }

  _closeComplete = () => {
    this.setState({
      completeVisible: false
    })
  }

  //server로 전송까지
  _orderComplete = () => {
    this.setState({
      completeVisible: false,
      cart: []
    })
    vacateCart()
  }

  load = async () => {
    let parsedCart
    try {
      parsedCart = await loadCart()
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({
        loading: false,
        cart: parsedCart || []
      })
    }
  }

  render() {
    const { cart, loading, completeVisible } = this.state
    if (loading) return <Loader />
    else if (cart === [] || cart.length === 0)
      return (
        <Refresh onPress={() => this.componentDidMount()}>
          <Notice text="장바구니가 비어있습니다" />
        </Refresh>
      )
    else
      return (
        <>
          <NavigationEvents
            onWillFocus={async () => {
              this.load()
            }}
          />
          {loading ? (
            <Loader />
          ) : cart.length === 0 ? (
            <Notice text="장바구니가 비어있습니다" />
          ) : (
            <>
              <CartPresenter
                cart={cart}
                _openComplete={this._openComplete}
                _update={this._update}
              />
              <Complete
                visible={completeVisible}
                _closeComplete={this._closeComplete}
                from={"order"}
                img={cart[0].image}
                length={cart.length}
                start="Cart"
                _orderComplete={this._orderComplete}
              />
            </>
          )}
        </>
      )
  }
}
