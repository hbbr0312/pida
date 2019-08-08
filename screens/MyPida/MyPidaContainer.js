import React from "react";
import MyPidaPresenter from "./MyPidaPresenter";
import { register } from "../../api";

export default class extends React.Component {
  componentDidMount = async () => {
    console.log("pida componentDidMount");
    try {
      const respon = await register("success11@pida.com", "test123");
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return <MyPidaPresenter />;
  }
}
