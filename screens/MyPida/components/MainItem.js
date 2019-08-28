import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Status, GroupStatus } from "./Status"
import { Palette2, Palette3, Palette7 } from "../../../components/Palettes"
import Layout from "../../../constants/Layout"

const MainItem = ({ label, date, image, status, number }) => {
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
  label: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  image: PropTypes.string,
  number: PropTypes.number
}

export default MainItem

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
  margin-bottom: 20px;
`

const Image = styled.Image`
  width: 200px;
  height: 200px;
`
