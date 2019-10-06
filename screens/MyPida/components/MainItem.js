import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Status, GroupStatus } from "./Status"
import { Palette2, Palette3, Palette7 } from "../../../components/Palettes"
import Layout from "../../../constants/Layout"
import { timeParser } from "../../../utils"

const MainItem = ({ order }) => {
  const label = order.label
  const date = makeTime(order.order_time)
  const image = order.products[0].product.image //for purchase, group_purchase
  const status = order.status
  const number = order.products.length //for tester
  if (label === 1)
    return (
      <View>
        <Date>{date}</Date>
        <Preview>
          {number === 2 && (
            <Palette2 isSmall={false} filled={2} shadow={true} />
          )}
          {number === 3 && <Palette3 />}
          {number === 7 && <Palette7 />}
        </Preview>
        <Bottom>
          <Status status={status} />
        </Bottom>
      </View>
    )
  else if (label === 2) {
    //purchase_order
    return (
      <View>
        <Date>{date}</Date>
        <Preview>
          <Image source={{ uri: image }} />
        </Preview>
        <Bottom>
          <Status status={status} />
        </Bottom>
      </View>
    )
  } else {
    //group_purchase_order
    return (
      <View>
        <Date>{date}</Date>
        <Preview>
          <Image source={{ uri: image }} />
        </Preview>
        <Bottom>
          <GroupStatus status={status} />
        </Bottom>
      </View>
    )
  }
}

MainItem.propTypes = {
  order: PropTypes.object.isRequired
}

export default MainItem

const makeTime = order_time => {
  if (!order_time) return ""
  const time = timeParser(order_time)
  return time.month + "월 " + time.day + "일 "
}

const View = styled.View`
  border-bottom-width: 0.3px;
  border-bottom-color: #c9c9c9;
`

const Date = styled.Text`
  margin-top: 20px;
  margin-left: 20px;
  font-size: 20px;
`

const Preview = styled.View`
  height: 300px;
  width: ${Layout.window.width};
  align-items: center;
  justify-content: center;
`

const Bottom = styled.View`
  align-items: center;
  margin-bottom: 35px;
`

const Image = styled.Image`
  width: 200px;
  height: 200px;
`
