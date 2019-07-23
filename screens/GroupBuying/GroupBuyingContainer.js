import React from "react";
import GroupBuyingPresenter from "./GroupBuyingPresenter";
import Loader from "../../components/Loader";
import { Query } from "react-apollo";
import { GROUP_BUYING } from "../../Apollo/queries";
import Detail from "../Detail/Detail";

export default class GroupBuyingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,
      detailInfo: {},
      product: {}
    };
  }

  _openDetail = (product, discount_rates, orders_num, period) => {
    const detailInfo = {
      discount_rates,
      orders_num,
      period
    };
    this.setState({ detailVisible: true, product, detailInfo });
  };

  _closeDetail = () => {
    this.setState({ detailVisible: false });
  };

  render() {
    var currentdate = new Date();
    const { detailVisible, product, detailInfo } = this.state;
    return (
      <Query query={GROUP_BUYING}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          else if (error) {
            console.log(error);
            return null;
          } else {
            let validData = data.groupBuying;
            /* 진행중인 공동구매만 */
            // validData = data.groupBuying.filter(
            //   item => new Date(item.closing_time) > currentdate
            // );
            return (
              <>
                <GroupBuyingPresenter
                  data={validData}
                  _openDetail={this._openDetail}
                />
                <Detail
                  visible={detailVisible}
                  product={product}
                  tab="group_buying"
                  _closeDetail={this._closeDetail}
                  discount_rates={detailInfo.discount_rates}
                  orders_num={detailInfo.orders_num}
                  period={detailInfo.period}
                />
              </>
            );
          }
        }}
      </Query>
    );
  }
}
