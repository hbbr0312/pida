import React from "react"
import MyPidaPresenter from "./MyPidaPresenter"
import Loader from "../../components/Loader"
import { getProduct } from "../../api"

//주문한 테스터, 상품, 공동구매 정보 가져오기
//각각의 상품에 대한 정보 가져오기 getProduct

//[ { url : "" , qty : 0 }, ...]
const fakeData = {
  tester: {
    date: "8월 27일",
    status: "preparing",
    products: [
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/1/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/2/"
    ]
  },
  order: {
    date: "6월 12일",
    status: "shipping",
    products: [
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/3/"
    ]
  },
  group_order: {
    date: "3월 12일",
    status: "ongoing",
    product:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/4/"
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tester: fakeData.tester,
      order: fakeData.order,
      group_order: fakeData.group_order,
      loading: true
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: false })
  }

  render() {
    const { tester, order, group_order, loading } = this.state

    return loading ? (
      <Loader />
    ) : (
      <MyPidaPresenter
        tester={tester}
        order={order}
        group_order={group_order}
      />
    )
  }
}
