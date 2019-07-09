import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Title } from "./Styled";

const Container = styled.View``;

const ReviewSection = ({ reviews }) => {
  return (
    <Container>
      <Title>리뷰</Title>
    </Container>
  );
};

ReviewSection.propTypes = {
  reviews: PropTypes.array
};

export default ReviewSection;
