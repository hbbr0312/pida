import React from "react"
import { getPayInfo } from "../../../api"
import PayInfoPresenter from "./PayInfoPresenter"
import Loader from "../../../components/Loader"
import CompanyModal from "./CompanyModal"

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "결제 정보"
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      fixed: true,
      visible: false,
      issuer: null,
      month: null,
      year: null,
      card_number_0: null,
      card_number_1: null,
      card_number_2: null,
      card_number_3: null,
      cvc: null,
      password_hashed: null
    }
  }
  _updateState = json => {
    this.setState(json)
  }
  componentDidMount = async () => {
    let payInfo = await getPayInfo()
    console.log(payInfo)
    payInfo = {
      issuer: "우리카드",
      card_number: "1234567800001234",
      cvc: "111",
      expiration_date: "0812",
      password_hashed: "1234"
    }
    this.setState({
      issuer: payInfo.issuer || "",
      month: parseMonth(payInfo.expiration_date),
      year: parseYear(payInfo.expiration_date),
      card_number_0: payInfo.card_number.substring(0, 4),
      card_number_1: payInfo.card_number.substring(4, 8),
      card_number_2: payInfo.card_number.substring(8, 12),
      card_number_3: payInfo.card_number.substring(12),
      cvc: payInfo.cvc,
      password_hashed: payInfo.password_hashed,
      loading: false
    })
  }

  render() {
    const {
      loading,
      issuer,
      month,
      year,
      card_number_0,
      card_number_1,
      card_number_2,
      card_number_3,
      cvc,
      password_hashed,
      fixed,
      visible
    } = this.state

    return loading ? (
      <Loader />
    ) : (
      <>
        <PayInfoPresenter
          issuer={issuer}
          month={month}
          year={year}
          card_number_0={card_number_0}
          card_number_1={card_number_1}
          card_number_2={card_number_2}
          card_number_3={card_number_3}
          cvc={cvc}
          password_hashed={password_hashed}
          _updateState={this._updateState}
          fixed={fixed}
        />
        <CompanyModal _updateState={this._updateState} visible={visible} />
      </>
    )
  }
}

const parseMonth = period => {
  if (period.length < 2) return period
  else {
    return period.substring(0, 2)
  }
}
const parseYear = period => {
  if (period.length < 2) return ""
  else {
    return period.substring(2)
  }
}
