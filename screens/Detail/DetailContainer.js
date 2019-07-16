import React from "react";
import DetailPresenter from "./DetailPresenter";

//TODO: image load , reviews load

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { product, tab, discount_rates, orders_num, period }
        }
      }
    } = props;
    this.state = {
      product,
      tab,
      discount_rates,
      orders_num,
      period
    };
  }
  render() {
    const { tab, product, discount_rates, orders_num, period } = this.state;
    return (
      <DetailPresenter
        tab={tab}
        product={product}
        discount_rates={discount_rates}
        orders_num={orders_num}
        period={period}
      />
    );
  }
}
