import React from "react";
import styled from "styled-components";
import Section from "./components/Section";
import PropTypes from "prop-types";
import ReadySections from "./components/ReadySections";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const CategoryPresenter = ({ category }) => {
  return (
    <View>
      <Section
        key={0}
        name="크림"
        colors={["#ff5259", "#FFA8AC"]}
        items={category.filter(data => data.big_name === "크림")}
      />
    </View>
  );
};

CategoryPresenter.propTypes = {
  category: PropTypes.array
};

export default CategoryPresenter;
