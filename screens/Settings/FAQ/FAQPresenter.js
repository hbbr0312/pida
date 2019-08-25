import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Ionicons } from "@expo/vector-icons"

export default class extends React.Component {
  static propTypes = {
    faqs: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    const { open, faqs } = props
    return { open: open, faqs: faqs }
  }
  _makeItem = (faq, i) => {
    const { open } = this.state
    const item = (
      <Faq key={faq.id}>
        <Header onPress={() => this._handleOpen(i)}>
          <Title>{faq.title}</Title>
          <Icon>
            <Ionicons
              name={open[i] ? "ios-arrow-up" : "ios-arrow-down"}
              color="black"
              size={20}
            />
          </Icon>
        </Header>
        {open[i] ? (
          <Body>
            <Content>{faq.content}</Content>
          </Body>
        ) : null}
      </Faq>
    )
    return item
  }
  _handleOpen = i => {
    const { open } = this.state
    open[i] = !open[i]
    this.setState({ open })
  }

  render() {
    const { faqs } = this.state
    let result = []
    for (var i = 0; i < faqs.length; i++) {
      result.push(this._makeItem(faqs[i], i))
    }
    return <Container>{result}</Container>
  }
}

const Container = styled.View`
  border-top-color: #c9c9c9;
  border-top-width: 0.3px;
`

const Faq = styled.View`
  border-bottom-color: #c9c9c9;
  border-bottom-width: 0.3px;
`
const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 65px;
  margin-left: 20px;
`
const Title = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 200;
  flex: 1;
`
const Icon = styled.View`
  margin-right: 20px;
`
const Body = styled.View`
  margin: 20px;
  margin-top: 10px;
`

const Content = styled.Text`
  color: grey;
`
