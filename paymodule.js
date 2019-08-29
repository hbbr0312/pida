import IMP from "iamport-react-native"
import Loader from "./components/Loader"
import React from "react"
import { loadCart, loadPalette } from "./utils"
import { AsyncStorage } from "react-native"
import { getAddressInfo, getUserInfo } from "./api"

export const testerPay = async callback => {
  const palette = await loadPalette()
  const payInfo = parcePalette(palette)
  const user = await parseUserinfo()
  const data = {
    pg: "kcp",
    pay_method: "card",
    name: payInfo.name,
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: payInfo.price,
    buyer_name: user.name,
    buyer_tel: user.tel,
    buyer_email: user.email,
    buyer_addr: user.addr,
    buyer_postcode: user.postcode,
    app_scheme: "example"
  }
  return (
    <IMP.Payment
      userCode={"imp32836432"} // 가맹점 식별코드
      loading={<Loader />} // 웹뷰 로딩 컴포넌트
      data={data} // 결제 데이터
      callback={callback} // 결제 종료 후 콜백
    />
  )
}
export const cartPay = async callback => {
  const payInfo = await parseCart()
  if (payInfo.price === 0) {
    return null
  }
  const user = await parseUserinfo()
  const data = {
    pg: "kcp",
    pay_method: "card",
    name: payInfo.name,
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: payInfo.price,
    buyer_name: user.name,
    buyer_tel: user.tel,
    buyer_email: user.email,
    buyer_addr: user.addr,
    buyer_postcode: user.postcode,
    app_scheme: "example"
  }
  return (
    <IMP.Payment
      userCode={"imp32836432"} // 가맹점 식별코드
      loading={<Loader />} // 웹뷰 로딩 컴포넌트
      data={data} // 결제 데이터
      callback={callback} // 결제 종료 후 콜백
    />
  )
}

//수정 필요
export const groupPay = async (select, callback) => {
  const user = await parseUserinfo()
  const data = {
    pg: "kcp",
    pay_method: "card",
    name: "공동구매",
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: 1000,
    buyer_name: user.name,
    buyer_tel: user.tel,
    buyer_email: user.email,
    buyer_addr: user.addr,
    buyer_postcode: user.postcode,
    app_scheme: "example"
  }
  return (
    <IMP.Payment
      userCode={"imp32836432"}
      loading={<Loader />}
      data={data}
      callback={callback}
    />
  )
}

const parseUserinfo = async () => {
  const username = await AsyncStorage.getItem("username")
  const info = await getUserInfo()
  const addr_info = await getAddressInfo()
  const user_info = {
    name: info.name,
    email: username,
    postcode: addr_info.postal_code,
    addr: `${addr_info.address_line_road} ${addr_info.address_line_detail}`,
    tel: addr_info.contact
  }
  return user_info
}

const parseCart = async () => {
  const cart = await loadCart()
  if (cart.length === 0) return { price: 0, name: "" }
  let price = 0
  cart.forEach(product => {
    price += parseInt(product.price) * parseInt(product.number)
  })
  let name = cart[0].name
  if (cart.length > 1) name += ` 외 ${cart.length - 1}건`
  return { price, name }
}

const parcePalette = palette => {
  const leng = palette.size
  switch (leng) {
    case 2:
      return {
        price: 2500,
        name: "테스터 2개: " + palette.selected[0].name + " 외 1개"
      }
    case 3:
      return {
        price: 2500,
        name: "테스터 3개: " + palette.selected[0].name + " 외 2개"
      }
    case 7:
      return {
        price: 2500,
        name: "테스터 7개: " + palette.selected[0].name + " 외 6개"
      }
  }
}
