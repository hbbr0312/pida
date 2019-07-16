import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Layout from "../../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import { Layer } from "../../../components/Layer";

const Container = styled.View`
  height: 50px;
  width: ${Layout.window.width - 30};
  background-color: ${props => props.itemColor};
  border-bottom-left-radius: ${props => (props.isLast ? "5px " : "0px")};
  border-bottom-end-radius: ${props => (props.isLast ? "5px " : "0px")};
  border-bottom-width: ${props => (props.isLast ? "0px " : "0.3px")};
  border-bottom-color: grey;
  ${props => (props.isFake ? "position: relative" : "")};
`;
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const View = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const Text = styled.Text`
  margin-left: 15px;
  font-size: 18px;
  flex: 10;
`;

const Icon = styled.View`
  justify-content: flex-end;
  display: flex;
  flex: 1;
`;

const Item = ({
  name,
  isLast = false,
  products,
  navigation,
  isFake,
  itemColor
}) => {
  const content = (
    <>
      <Text>{name}</Text>
      <Icon>
        <Ionicons name={`ios-arrow-forward`} style={{ fontSize: 15 }} />
      </Icon>
    </>
  );
  return (
    <Container isLast={isLast} isFake={isFake} itemColor={itemColor}>
      {isFake ? (
        <Layer top={false}>
          <View>{content}</View>
        </Layer>
      ) : (
        <Touchable
          onPress={() =>
            navigation.navigate({
              routeName: "ProductList",
              params: {
                name,
                products
              }
            })
          }
        >
          {content}
        </Touchable>
      )}
    </Container>
  );
};

Item.proptypes = {
  name: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  isLast: PropTypes.bool,
  isFake: PropTypes.bool.isRequired,
  itemColor: PropTypes.string.isRequired
};

export default withNavigation(Item);
