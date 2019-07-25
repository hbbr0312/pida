import React from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import DetailPresenter from "./DetailPresenter";
import { put2cart } from "../../utils";
import { withNavigation } from "react-navigation";
import { getReview } from "../../api";
import { getReviewer } from "../../utils";

class DetailContainer extends React.Component {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    _closeDetail: PropTypes.func.isRequired,
    discount_rates: PropTypes.array, //공동구매 탭
    orders_num: PropTypes.number, //공동구매 탭
    period: PropTypes.string, //공동구매 탭
    _addTester: PropTypes.func //카테고리 탭
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      number: "1",
      reviews: []
    };
  }

  componentDidMount = async () => {
    const { product } = this.props;
    let reviews = [];
    try {
      for (var i = 0; i < product.reviews.length; i++) {
        let item = await getReview(product.reviews[i]);
        let review = {
          id: item.id,
          user: getReviewer(item.owner),
          content: item.content
        };
        reviews.push(review);
      }
    } catch {
    } finally {
      this.setState({ reviews });
    }
  };

  _openCartModal = () => {
    this.setState({ modalVisible: true });
  };

  _closeCartModal = () => {
    this.setState({ modalVisible: false });
  };

  _controlInput = num => {
    this.setState({ number: num });
  };

  _put2Cart = async () => {
    const { product, navigation } = this.props;
    const { number } = this.state;
    this.setState({ modalVisible: false });
    try {
      const no = await put2cart(product, Number(number));
      if (no === 1) {
        Alert.alert(
          "상품 담기 완료",
          "장바구니로 이동하시겠습니까?",
          [
            {
              text: "장바구니로 이동",
              onPress: () =>
                navigation.navigate({
                  routeName: "Cart",
                  params: {}
                })
            },
            { text: "취소", style: "cancel" }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "경고",
          "이미 담긴 상품입니다",
          [{ text: "OK", style: "cancel" }],
          { cancelable: false }
        );
      }
    } catch {}
  };

  render() {
    const {
      tab,
      product,
      visible,
      _closeDetail,
      discount_rates,
      orders_num,
      period,
      _addTester
    } = this.props;
    const { modalVisible, number, reviews } = this.state;
    return (
      <DetailPresenter
        tab={tab}
        product={product}
        visible={visible}
        _closeDetail={_closeDetail}
        discount_rates={discount_rates}
        orders_num={orders_num}
        period={period}
        _addTester={_addTester}
        modalVisible={modalVisible}
        _openCartModal={this._openCartModal}
        _closeCartModal={this._closeCartModal}
        number={number}
        _controlInput={this._controlInput}
        _put2Cart={this._put2Cart}
        reviews={reviews}
      />
    );
  }
}

export default withNavigation(DetailContainer);
