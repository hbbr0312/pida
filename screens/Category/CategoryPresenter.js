import React from "react";
import styled from "styled-components";
import Section from "./Section";
import PropTypes from "prop-types";

const Container = styled.ScrollView`
  margin-bottom: 15px;
`;

const Text = styled.Text``;

const fakeData = [
  {
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/5/",
    id: 5,
    products: [
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/12/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/13/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/14/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/15/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/16/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/17/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/18/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/19/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/20/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/21/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/22/"
    ],
    name: "물티슈",
    big_name: "유아용품"
  },
  {
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 1,
    products: [
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/1/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/2/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/3/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/4/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/5/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/6/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/7/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/8/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/9/",
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/10/"
    ],
    name: "수분",
    big_name: "크림"
  },
  {
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/3/",
    id: 3,
    products: [],
    name: "시카",
    big_name: "크림"
  },
  {
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/2/",
    id: 2,
    products: [],
    name: "재생",
    big_name: "크림"
  },
  {
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/4/",
    id: 4,
    products: [],
    name: "진정",
    big_name: "크림"
  }
];
export default function({}) {
  return (
    <Container>
      <Section
        key={1}
        name="크림"
        items={fakeData.filter(data => data.big_name === "크림")}
      />
      <Section
        key={2}
        name="유아용품"
        items={fakeData.filter(data => data.big_name === "유아용품")}
      />
    </Container>
  );
}
