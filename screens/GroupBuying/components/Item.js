import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ProgressBar from "../../../components/ProgressBar";
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import { withNavigation } from "react-navigation";
import { priceParser } from "../../../utils";
import { Query } from "react-apollo";
import { PRODUCT } from "../../../Apollo/queries";
import Loader from "../../../components/Loader";

const Container = styled.TouchableOpacity`
  border-radius: 5px;
  box-shadow: 0px 2px 3px grey;
  width: ${Layout.window.width - 40};
  background-color: white;
  align-self: center;
  margin-top: 20px;
  margin-bottom: ${props => (props.isLast ? "20px" : "0px")};
`;
const Image = styled.Image`
  width: 200px;
  height: 200px;
  margin-top: 40px;
  margin-bottom: 40px;
  align-self: center;
`;
const Brand = styled.Text`
  margin-left: 15px;
  color: ${Colors.brandText};
  font-size: 17px;
`;

const Name = styled.Text`
  margin-top: 10px;
  margin-left: 15px
  font-size: 20px;
`;
const Price = styled.Text`
  color: ${Colors.priceText};
  margin-top: 10px;
  margin-left: 15px
  font-size: 17px;
  text-decoration: line-through;
  text-decoration-color: ${Colors.priceText};
`;

const Item = ({ item, navigation, isLast = false }) => {
  return (
    <Query query={PRODUCT} variables={{ id: item.product.id }}>
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) {
          console.log(error);
          return null;
        }
        return (
          <Container
            isLast={isLast}
            onPress={() =>
              navigation.navigate({
                routeName: "Detail",
                params: {
                  tab: "group_buying",
                  product: data.product,
                  discount_rates: item.discount_rates,
                  orders_num: item.orders.length,
                  period: item.closing_time.substring(0, 10)
                }
              })
            }
          >
            <Image source={{ uri: item.product.image }} />
            <Brand>{data.product.brand.name}</Brand>
            <Name>{item.product.name}</Name>
            <Price>{priceParser(data.product.price)} </Price>
            <ProgressBar
              period={item.closing_time.substring(0, 10)}
              price={data.product.price}
              discount_rates={item.discount_rates}
              orders_num={item.orders.length}
            />
          </Container>
        );
      }}
    </Query>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  isLast: PropTypes.bool
};

export default withNavigation(Item);
