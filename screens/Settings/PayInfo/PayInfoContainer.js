import React from "react"
import { getPayInfo } from "../../../api"
import PayInfoPresenter from "./PayInfoPresenter"
import Loader from "../../../components/Loader"

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
      payInfo: {},
      fixed: true
    }
  }
  _updateState = json => {
    this.setState(json)
  }
  componentDidMount = async () => {
    const payInfo = await getPayInfo()
    this.setState({ payInfo, loading: false })
  }
  render() {
    const { loading, payInfo, fixed } = this.state
    return loading ? (
      <Loader />
    ) : (
      <PayInfoPresenter
        payInfo={payInfo}
        _updateState={this._updateState}
        fixed={fixed}
      />
    )
  }
}
