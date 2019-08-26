import React from "react"
import AddressInfoPresenter from "./AddressInfoPresenter"
import { getAddressInfo } from "../../../api"
import Loader from "../../../components/Loader"

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "배송 정보"
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      addressInfo: {},
      fixed: true,
      name: null,
      contact_0: null,
      contact_1: null,
      contact_2: null,
      postal_code: null,
      address_line_road: null,
      address_line_detail: null
    }
  }
  _updateState = json => {
    this.setState(json)
  }

  componentDidMount = async () => {
    let addressInfo = await getAddressInfo()
    console.log(addressInfo)
    addressInfo = {
      address_line_detail: "302동 1201호",
      address_line_road: "대전광역시 유성구 대학로 291",
      contact: "01024029876",
      id: 110,
      name: "홍길동",
      owner:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/users/final/",
      postal_code: "34141",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/delivery-informations/110/",
      valid: false
    }

    this.setState({
      name: addressInfo.name,
      contact_0: addressInfo.contact.substring(0, 3),
      contact_1: addressInfo.contact.substring(3, 7),
      contact_2: addressInfo.contact.substring(7),
      postal_code: addressInfo.postal_code,
      address_line_road: addressInfo.address_line_road,
      address_line_detail: addressInfo.address_line_detail,
      loading: false
    })
  }

  render() {
    const {
      fixed,
      loading,
      name,
      contact_0,
      contact_1,
      contact_2,
      postal_code,
      address_line_road,
      address_line_detail
    } = this.state
    return loading ? (
      <Loader />
    ) : (
      <AddressInfoPresenter
        fixed={fixed}
        name={name}
        contact_0={contact_0}
        contact_1={contact_1}
        contact_2={contact_2}
        postal_code={postal_code}
        address_line_road={address_line_road}
        address_line_detail={address_line_detail}
        _updateState={this._updateState}
      />
    )
  }
}
