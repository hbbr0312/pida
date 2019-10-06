import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import MainItem from "./components/MainItem"
import PidaDetail from "./components/PidaDetail"
import Detail from "../Detail"

const MyPidaPresenter = ({
  orders,
  pida,
  detail,
  product,
  order,
  openPidaDetail,
  closePidaDetail,
  openDetail,
  closeDetail
}) => {
  if (orders.length === 0)
    return (
      <NoticeView>
        <Notice>주문 내역이 없습니다.</Notice>
      </NoticeView>
    )
  return (
    <>
      <Container>
        {orders.map((element, index) => (
          <Item key={index} onPress={() => openPidaDetail(element)}>
            <MainItem order={element} />
          </Item>
        ))}
      </Container>
      <Detail
        tab={"MyPida"}
        product={product}
        visible={detail}
        _closeDetail={closeDetail}
      />
      <PidaDetail
        visible={pida}
        closeModal={closePidaDetail}
        order={order}
        openDetail={openDetail}
      />
    </>
  )
}

MyPidaPresenter.propTypes = {
  orders: PropTypes.array,
  pida: PropTypes.bool.isRequired,
  detail: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  openPidaDetail: PropTypes.func.isRequired,
  closePidaDetail: PropTypes.func.isRequired,
  openDetail: PropTypes.func.isRequired,
  closeDetail: PropTypes.func.isRequired
}

export default MyPidaPresenter

const Container = styled.ScrollView``

const Item = styled.TouchableOpacity``

const NoticeView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Notice = styled.Text`
  color: grey;
`
