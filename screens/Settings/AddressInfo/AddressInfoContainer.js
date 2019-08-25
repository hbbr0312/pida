import React from "react"
import AddressInfoPresenter from "./AddressInfoPresenter"

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "배송 정보"
    }
  }
  render() {
    return <AddressInfoPresenter />
  }
}
