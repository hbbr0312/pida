import Colors from "../../../constants/Colors"
import styled from "styled-components"

export const Content = styled.View`
  flex: 5.5;
`
export const ButtonContainer = styled.View`
  flex: 1;
  align-items: center;
`

export const Next = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 50px;
  border-radius: 4px;
  background-color: ${props =>
    props.valid ? Colors.tintColor : Colors.invalidButton};
`

export const ButtonText = styled.Text`
  color: ${props => (props.valid ? "white" : Colors.invalidButtonText)};
  font-size: 16px;
  letter-spacing: 1px;
`
