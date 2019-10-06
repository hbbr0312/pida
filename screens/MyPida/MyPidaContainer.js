import React from "react"
import MyPidaPresenter from "./MyPidaPresenter"
import Loader from "../../components/Loader"
import {
  getTesters,
  getUserInfo,
  getPurchases,
  getDeliveryInfo,
  getProducts,
  orderPurchase,
  orderTester
} from "../../api"
import { timeParser, time2int } from "../../utils"

//주문한 테스터, 상품, 공동구매 정보 가져오기
//각각의 상품에 대한 정보 가져오기 getProduct

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      pida: false,
      detail: false,
      loading: true,
      product: {},
      order: {}
    }
  }
  openPidaDetail = order => {
    this.setState({ pida: true, order })
  }
  closePidaDetail = () => {
    this.setState({ pida: false, order: {} })
  }
  openDetail = product => {
    this.setState({ detail: true, product, pida: false })
  }
  closeDetail = () => {
    this.setState({ detail: false, product: {}, pida: true })
  }

  componentDidMount = async () => {
    const userInfo = await getUserInfo()
    const tester_orders = await this.parseTesterOrder(
      userInfo.result.tester_orders
    )
    const purchase_orders = await this.parsePurchaseOrder(
      userInfo.result.purchase_orders
    )
    const orders = this.sortByOrderTime(tester_orders.concat(purchase_orders))
    this.setState({ loading: false, orders: orders })
  }

  sortByOrderTime = array => {
    return array.sort((a, b) => {
      return b.time - a.time
    })
  }

  parseTesterOrder = async orders => {
    const result = []
    for (var i = 0; i < orders.length; i++) {
      const order = orders[i]
      const info = {}
      info.order_time = order.order_time
      info.delivery_info = await getDeliveryInfo(order.delivery_information)
      info.status = order.status
      info.products = await getTesters(order.products)
      info.label = 1
      info.price = order.price
      info.time = time2int(order.order_time)
      result.push(info)
    }
    return result
  }

  parsePurchaseOrder = async orders => {
    const result = []
    for (var i = 0; i < orders.length; i++) {
      const order = orders[i]
      const info = {}
      info.order_time = order.order_time
      info.delivery_info = await getDeliveryInfo(order.delivery_information)
      info.status = order.status
      info.products = await getPurchases(order.items)
      info.label = 2
      info.price = order.price
      info.time = time2int(order.order_time)
      result.push(info)
    }
    return result
  }

  render() {
    const { orders, loading, pida, detail, product, order } = this.state

    return loading ? (
      <Loader />
    ) : (
      <MyPidaPresenter
        orders={orders}
        product={product}
        order={order}
        pida={pida}
        detail={detail}
        openPidaDetail={this.openPidaDetail}
        closePidaDetail={this.closePidaDetail}
        openDetail={this.openDetail}
        closeDetail={this.closeDetail}
      />
    )
  }
}
