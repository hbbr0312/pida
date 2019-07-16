import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Item from "./components/Item";

const Container = styled.ScrollView``;

const GroupBuyingPresenter = ({ data }) => {
  return (
    <Container>
      {data.map((item, index) =>
        index === data.length - 1 ? (
          <Item key={item.id} item={item} isLast={true} />
        ) : (
          <Item key={item.id} item={item} />
        )
      )}
    </Container>
  );
};

GroupBuyingPresenter.propTypes = {
  data: PropTypes.array.isRequired
};

export default GroupBuyingPresenter;
