import React from "react"
import MyPidaPresenter from "./MyPidaPresenter"
import { getTesterOrder, addressSearch } from "../../api"

export default class extends React.Component {
  componentDidMount = async () => {}
  render() {
    return <MyPidaPresenter />
  }
}
