import React from "react";
import GroupBuyingPresenter from "./GroupBuyingPresenter";
import Loader from "../../components/Loader";
import { Query } from "react-apollo";
import { GROUP_BUYING } from "../../Apollo/queries";

const GroupBuyingContainer = ({}) => {
  var currentdate = new Date();
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
          return <GroupBuyingPresenter data={validData} />;
        }
      }}
    </Query>
  );
};

export default GroupBuyingContainer;
