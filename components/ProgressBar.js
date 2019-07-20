import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { priceParser } from "../utils";

const Wrap = styled.View`
  width: ${Layout.window.width - 100};
  align-self: center;
`;
const Container = styled.View`
  align-items: center;
`;

const Tag = styled.View`
  flex: 1;
  align-self: flex-start;
  align-items: flex-start;
  margin-top: ${props => props.marginTop};
`;
//margin-left: ${props => props.marginLeft};

const PriceBubble = styled.View`
  align-items: center;
  justify-content: center;
`;

const Price = styled.View`
  width: 90px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.tintColor};
  border-radius: 5px;
  margin-left: ${props => props.marginLeft};
`;

const Text = styled.Text`
  color: white;
`;
const Triangle = styled.View`
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-top-width: 10;
  border-left-width: 5;
  border-right-width: 5;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: ${Colors.tintColor};
  margin-bottom: 5px;
  margin-left: ${props => props.marginLeft};
`;

const Bar = styled.View`
  height: 12px;
  position: relative;
  flex-direction: row;
  border-radius: 5px;
  background-color: ${Colors.progressRemainColor};
`;
const Circle = styled.View`
  align-self: flex-start;
  position: absolute;
  background-color: white;
  height: 9px;
  width: 9px;
  border-radius: 4.5px;
  margin-top: 1.5px;
  margin-left: ${props => props.marginLeft};
`;
const EndCircle = styled.View`
  align-self: flex-end;
  position: absolute;
  background-color: white;
  height: 9px;
  width: 9px;
  border-radius: 4.5px;
  top: 1.5px;
  right: 1.5px;
`;
const Buying = styled.View`
  background-color: ${Colors.tintColor};
  border-radius: 5px;
  border-bottom-left-radius: 5px;
  flex: ${props => props.flex};
`;
const Remain = styled.View`
  flex: ${props => props.flex};
`;
const View = styled.View`
  align-items: flex-end;
  margin-bottom: ${props => props.marginBottom};
`;
const Period = styled.Text`
  margin-top: 15px;
  font-size: 15px;
  color: grey;
`;
const calculateDiscount = (discount_rates, orders_num) => {
  const len = discount_rates.length;
  const max = discount_rates[len - 1].quantity;
  let cDiscountRate = 0.0;
  for (var i = 0; i < discount_rates.length; i++) {
    if (discount_rates[i].quantity <= orders_num) {
      cDiscountRate = discount_rates[i].rate;
    } else break;
  }
  const json = {
    discount_rate: cDiscountRate,
    process_rate: Math.floor((orders_num / max) * 100)
  };
  return json;
};

const calculateMargin = process_rate => {
  const difference = (Layout.window.width - 112) / 100;
  const triangleMargin = difference * process_rate;
  let boxMargin;
  if (process_rate < 8) boxMargin = -10;
  else if (process_rate > 92) boxMargin = 239;
  else boxMargin = triangleMargin - 40;
  return {
    triangle: triangleMargin,
    box: boxMargin
  };
};

const putCircle = discount_rates => {
  const len = discount_rates.length;
  let answer = [];
  const max = discount_rates[len - 1].quantity;
  let curr;
  for (var i = 0; i < len - 1; i++) {
    curr = discount_rates[i].quantity;
    let percent = (curr / max) * 100;
    let { triangle } = calculateMargin(percent);
    answer.push(<Circle marginLeft={triangle} key={curr} />);
  }
  answer.push(<Circle marginLeft={1.5} key={0} />);
  answer.push(<EndCircle key={-1} />);
  return answer;
};

const ProgressBar = ({
  period,
  price,
  discount_rates,
  orders_num,
  margin = "15px"
}) => {
  const json = calculateDiscount(discount_rates, orders_num);
  const current_price = price - Math.floor((price * json.discount_rate) / 100);
  const marginLeft = calculateMargin(json.process_rate);
  return (
    <Wrap>
      <Tag marginLeft={0} marginTop={margin}>
        <Price marginLeft={marginLeft.box}>
          <Text>{priceParser(current_price)}</Text>
        </Price>
        <Triangle marginLeft={marginLeft.triangle} />
      </Tag>
      <Container>
        <Bar>
          <Buying flex={json.process_rate} />
          <Remain flex={100 - json.process_rate} />
        </Bar>
        {putCircle(discount_rates)}
      </Container>
      <View marginBottom={margin}>
        <Period>~ {period}</Period>
      </View>
    </Wrap>
  );
};

ProgressBar.propTypes = {
  period: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount_rates: PropTypes.array.isRequired,
  orders_num: PropTypes.number.isRequired,
  margin: PropTypes.string
};

export default ProgressBar;
