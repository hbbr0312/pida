import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import MainItem from "./components/MainItem"
import PidaDetail from "./components/PidaDetail"

export default class extends React.Component {
  static propTypes = {
    tester: PropTypes.object,
    order: PropTypes.object,
    group_order: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      modal: 0
    }
  }

  closeModal = () => {
    this.setState({ modal: 0 })
  }

  openModal = label => {
    this.setState({ modal: label })
  }

  allEmpty = () => {
    const { tester, order, group_order } = this.props
    for (var key in tester) {
      if (tester.hasOwnProperty(key)) return false
    }
    for (var key in order) {
      if (tester.hasOwnProperty(key)) return false
    }
    for (var key in group_order) {
      if (tester.hasOwnProperty(key)) return false
    }
    return true
  }

  render() {
    const { tester, order, group_order } = this.props
    const { modal } = this.state
    const nothing = this.allEmpty()
    if (nothing)
      return (
        <NoticeView>
          <Notice>주문 내역이 없습니다.</Notice>
        </NoticeView>
      )
    return (
      <>
        <Container>
          <Item onPress={() => this.openModal(1)}>
            <MainItem
              label={1}
              date={tester.date}
              number={tester.products.length}
              status={tester.status}
            />
          </Item>
          <Item onPress={() => this.openModal(2)}>
            <MainItem
              label={2}
              date={order.date}
              status={order.status}
              image={
                "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/1.jpg"
              }
            />
          </Item>
          <Item onPress={() => this.openModal(3)}>
            <MainItem
              label={3}
              date={group_order.date}
              status={group_order.status}
              image={
                "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/10.jpg"
              }
            />
          </Item>
        </Container>
        <PidaDetail visible={modal === 1} closeModal={this.closeModal} />
        <PidaDetail visible={modal === 2} closeModal={this.closeModal} />
        <PidaDetail visible={modal === 3} closeModal={this.closeModal} />
      </>
    )
  }
}

const Container = styled.ScrollView``

const Item = styled.TouchableOpacity``

const NoticeView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Notice = styled.Text`
  color: grey;
`
