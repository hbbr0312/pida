import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Item from "./components/Item";

const Container = styled.ScrollView``;

const GroupBuyingPresenter = ({ data, _openDetail }) => {
  return (
    <Container>
      {data.map((item, index) =>
        index === data.length - 1 ? (
          <Item
            key={item.id}
            item={item}
            isLast={true}
            _openDetail={_openDetail}
          />
        ) : (
          <Item key={item.id} item={item} _openDetail={_openDetail} />
        )
      )}
    </Container>
  );
};

GroupBuyingPresenter.propTypes = {
  data: PropTypes.array.isRequired,
  _openDetail: PropTypes.func.isRequired
};

export default GroupBuyingPresenter;
