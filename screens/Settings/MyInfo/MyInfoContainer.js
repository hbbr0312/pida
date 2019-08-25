import React from "react"
import styled from "styled-components"
import MyInfoPresenter from "./MyInfoPresenter"
import Loader from "../../../components/Loader"
import GenderModal from "./modals/GenderModal"
import AgeModal from "./modals/AgeModal"
import TypeModal from "./modals/TypeModal"
import ConcernModal from "./modals/ConcernModal"
import AllergyModal from "./modals/AllergyModal"
import { getUserInfo } from "../../../api"

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "내 정보"
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      modifiable: false,
      step: 0
      //step// 1 - gender / 2 - age / 3 - skin_type / 4 - skin_concerns / 5 - allergies
    }
  }

  _updateState = json => {
    this.setState(json)
  }

  componentDidMount = async () => {
    const response = await getUserInfo()
    const userInfo = response.result
    this.setState({
      loading: false,
      username: userInfo.username,
      gender: userInfo.gender,
      age: userInfo.gender,
      skin_type: userInfo.skin_type,
      skin_concerns: userInfo.skin_concerns,
      allergies: userInfo.allergies
    })
  }

  render() {
    const {
      loading,
      username,
      gender,
      age,
      skin_type,
      skin_concerns,
      allergies,
      modifiable,
      step
    } = this.state
    return loading ? (
      <Loader />
    ) : (
      <>
        <MyInfoPresenter
          username={username}
          gender={gender}
          age={age}
          skin_type={skin_type}
          skin_concerns={skin_concerns}
          allergies={allergies}
          modifiable={modifiable}
          _updateState={this._updateState}
        />
        <GenderModal
          visible={step === 1}
          gender={gender}
          _updateState={this._updateState}
        />
        <AgeModal
          visible={step === 2}
          age={age}
          _updateState={this._updateState}
        />
        <TypeModal
          visible={step === 3}
          skin_type={skin_type}
          _updateState={this._updateState}
        />
        <ConcernModal
          visible={step === 4}
          skin_concerns={skin_concerns}
          _updateState={this._updateState}
        />
        <AllergyModal
          visible={step === 5}
          allergies={allergies}
          _updateState={this._updateState}
        />
      </>
    )
  }
}
