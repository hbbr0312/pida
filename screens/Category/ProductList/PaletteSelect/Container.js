import React from "react";
import Presenter from "./Presenter";

export default class Container extends React.Component {
  render() {
    return <Presenter _select={this.props._select} />;
  }
}
