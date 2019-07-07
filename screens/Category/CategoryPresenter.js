import React from "react";
import styled from "styled-components";
import Section from "./Section";
import PropTypes from "prop-types";

const Container = styled.ScrollView`
  margin-bottom: 15px;
`;

const Text = styled.Text``;

const CategoryPresenter = ({ category }) => {
  return (
    <Container>
      <Section
        key={1}
        name="크림"
        items={category.filter(data => data.big_name === "크림")}
      />
      <Section
        key={2}
        name="유아용품"
        items={category.filter(data => data.big_name === "유아용품")}
      />
    </Container>
  );
};

CategoryPresenter.propTypes = {
  category: PropTypes.array
};

export default CategoryPresenter;
