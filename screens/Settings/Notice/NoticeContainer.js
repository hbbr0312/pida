import React from "react"
import NoticePresenter from "./NoticePresenter"
import { getNotice, getFAQ } from "../../../api"

export default class extends React.Component {
  static navigationOptions = () => {
    return {
      title: "공지사항"
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      notices: [],
      open: []
    }
  }
  componentDidMount = async () => {
    const notices = await getFAQ()
    const open = Array(notices.length).fill(false)
    this.setState({ notices, open })
  }
  render() {
    const { notices, open } = this.state
    return <NoticePresenter notices={notices} open={open} />
  }
}
