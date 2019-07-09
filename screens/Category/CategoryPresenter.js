import React from "react";
import styled from "styled-components";
import Section from "./components/Section";
import PropTypes from "prop-types";
import ReadySections from "./components/ReadySections";

const ScrollView = styled.ScrollView``;

const CategoryPresenter = ({ category }) => {
  return (
    <ScrollView>
      <Section
        key={0}
        name="크림"
        color="#ff5158"
        items={category.filter(data => data.big_name === "크림")}
      />
      <Section
        key={1}
        name="유아용품"
        color="#45D2F5"
        items={category.filter(data => data.big_name === "유아용품")}
      />
      <ReadySections />
    </ScrollView>
  );
};

CategoryPresenter.propTypes = {
  category: PropTypes.array
};

export default CategoryPresenter;
