import React from "react";
import CategoryPresenter from "./CategoryPresenter";
import Loader from "../../components/Loader";
import { Query } from "react-apollo";
import { CATEGORY } from "../../Apollo/queries";

export default function CategoryContainer() {
  return (
    <Query query={CATEGORY}>
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) {
          console.log(error);
          return null;
        }
        return <CategoryPresenter category={data.category} />;
      }}
    </Query>
  );
}
