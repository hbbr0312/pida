import BootPay from "bootpay-js"

export const pay = () => {
  BootPay.request({
    price: "1000",
    application_id: "5d66125f4f74b4002ff4e41f",
    name: "블링블링 마스카라",
    pg: "",
    method: "",
    show_agree_window: 0,
    items: [
      {
        item_name: "나는 아이템",
        qty: 1,
        unique: "123",
        price: 1000,
        cat1: "TOP",
        cat2: "티셔츠",
        cat3: "라운드 티"
      }
    ],
    user_info: {
      username: "사용자 이름",
      email: "사용자 이메일",
      addr: "사용자 주소",
      phone: "010-1234-4567"
    },
    order_id: "고유order_id_1234",
    params: {
      callback1: "그대로 콜백받을 변수 1",
      callback2: "그대로 콜백받을 변수 2",
      customvar1234: "변수명도 마음대로"
    },
    account_expire_at: "2018-05-25",
    extra: {
      start_at: "2019-05-10",
      end_at: "2022-05-10",
      vbank_result: 1,
      quota: "0,2,3"
    }
  })
    .error(data => {
      console.log(data)
    })
    .cancel(data => {
      console.log(data)
    })
    .ready(data => {
      console.log(data)
    })
    .confirm(data => {
      console.log(data)
      var enable = true
      if (enable) {
        BootPay.transactionConfirm(data)
      } else {
        BootPay.removePaymentWindow()
      }
    })
    .close(data => {
      console.log(data)
    })
    .done(data => {
      console.log(data)
    })
}
