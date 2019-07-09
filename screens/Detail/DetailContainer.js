import React from "react";
import DetailPresenter from "./DetailPresenter";

//TODO: image load , reviews load

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { product, tab }
        }
      }
    } = props;
    this.state = {
      product,
      tab
    };
  }
  render() {
    const { tab, product } = this.state;
    return <DetailPresenter tab={tab} product={product} />;
  }
}
