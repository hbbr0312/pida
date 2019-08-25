import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const MemberDelete = () => {
  return <Text>회원 탈퇴</Text>
}

MemberDelete.propTypes = {}
MemberDelete.navigationOptions = () => {
  return {
    title: "회원 탈퇴"
  }
}

const Text = styled.Text``

export default MemberDelete
