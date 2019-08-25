import React from "react"
import FAQPresenter from "./FAQPresenter"
import { getFAQ } from "../../../api"

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "FAQ"
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      faqs: [],
      open: []
    }
  }
  componentDidMount = async () => {
    const faqs = await getFAQ()
    const open = Array(faqs.length).fill(false)
    this.setState({ faqs, open })
  }
  render() {
    const { faqs, open } = this.state
    return <FAQPresenter faqs={faqs} open={open} />
  }
}
