import React from "react";
import GroupBuyingPresenter from "./GroupBuyingPresenter";
import Loader from "../../components/Loader";
import { Query } from "react-apollo";
import { GROUP_BUYING } from "../../Apollo/queries";
import Detail from "../Detail";
import Notice from "../../components/Notice";
import Complete from "../../components/Complete";

export default class GroupBuyingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,
      detailInfo: {},
      product: {},
      completeVisible: false
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

  _openComplete = () => {
    this.setState({ completeVisible: true, detailVisible: false });
  };

  _closeComplete = () => {
    this.setState({ completeVisible: false });
  };

  render() {
    var currentdate = new Date();
    const { detailVisible, product, detailInfo, completeVisible } = this.state;
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
            if (validData.length === 0)
              return <Notice text="진행중인 공동구매가 없습니다." />;
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
                  _openComplete={this._openComplete}
                />
                <Complete
                  visible={completeVisible}
                  from={"group_buying"}
                  img={product.image}
                  _closeComplete={this._closeComplete}
                  start={"GroupBuying"}
                />
              </>
            );
          }
        }}
      </Query>
    );
  }
}
