import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import Colors from "../../../constants/Colors"

const active = "#FF5259"
const passed = "#FFC8CA"
const notyet = "#E1E1E1"

const makeColor = status => {
  switch (status) {
    case "preparing":
      return {
        circle1: active,
        line1: notyet,
        circle2: notyet,
        line2: notyet,
        circle3: notyet
      }
    case "shipping":
      return {
        circle1: passed,
        line1: passed,
        circle2: active,
        line2: notyet,
        circle3: notyet
      }
    case "delivered":
      return {
        circle1: passed,
        line1: passed,
        circle2: passed,
        line2: passed,
        circle3: active
      }
  }
}

export const Status = ({ status }) => {
  const colors = makeColor(status)
  return (
    <>
      <Container>
        <Circle color={colors.circle1} />
        <Line color={colors.line1} />
        <Circle color={colors.circle2} />
        <Line color={colors.line2} />
        <Circle color={colors.circle3} />
      </Container>
      <TextView>
        <Text margin={1} color={colors.circle1}>
          준비중
        </Text>
        <Text margin={105} color={colors.circle2}>
          배송중
        </Text>
        <Text margin={98} color={colors.circle3}>
          배송완료
        </Text>
      </TextView>
    </>
  )
}

const makeColor_g = status => {
  switch (status) {
    case "ongoing":
      return {
        circle0: active,
        line0: notyet,
        circle1: notyet,
        line1: notyet,
        circle2: notyet,
        line2: notyet,
        circle3: notyet
      }
    case "preparing":
      return {
        circle0: passed,
        line0: passed,
        circle1: active,
        line1: notyet,
        circle2: notyet,
        line2: notyet,
        circle3: notyet
      }
    case "shipping":
      return {
        circle0: passed,
        line0: passed,
        circle1: passed,
        line1: passed,
        circle2: active,
        line2: notyet,
        circle3: notyet
      }
    case "delivered":
      return {
        circle0: passed,
        line0: passed,
        circle1: passed,
        line1: passed,
        circle2: passed,
        line2: passed,
        circle3: active
      }
  }
}

export const GroupStatus = ({ status }) => {
  const colors = makeColor_g(status)
  return (
    <>
      <Container>
        <Circle color={colors.circle0} />
        <ShortLine color={colors.line0} />
        <Circle color={colors.circle1} />
        <ShortLine color={colors.line1} />
        <Circle color={colors.circle2} />
        <ShortLine color={colors.line2} />
        <Circle color={colors.circle3} />
      </Container>
      <TextView>
        <Text margin={1} color={colors.circle0}>
          진행중
        </Text>
        <Text margin={58} color={colors.circle1}>
          준비중
        </Text>
        <Text margin={58} color={colors.circle2}>
          배송중
        </Text>
        <Text margin={50} color={colors.circle3}>
          배송완료
        </Text>
      </TextView>
    </>
  )
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

const Circle = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border-width: 2px;
  border-color: ${props => props.color};
`

const Line = styled.View`
  width: 130px;
  height: 2px;
  background-color: ${props => props.color};
`
const ShortLine = styled.View`
  width: 83px;
  height: 2px;
  background-color: ${props => props.color};
`

const TextView = styled.View`
  width: 320px;
  margin-top: 4px;
  flex-direction: row;
  justify-content: flex-start;
`

const Text = styled.Text`
  font-size: 14px;
  margin-left: ${props => props.margin}
  color: ${props => props.color};
`
