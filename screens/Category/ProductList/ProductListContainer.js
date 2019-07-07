import React from "react";
import { getProduct } from "../../../api";
import Loader from "../../../components/Loader";
import ProductListPresenter from "./ProductListPresenter";

const fakeData = [
  {
    brand: {
      name: "에이스킨",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/1/"
    },
    capacity: 200,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 1,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/1.jpg",
    info_country: "대한민국",
    info_manufacturer: "휴먼코스메틱(주)",
    info_seller: "휴먼코스메틱(주)",
    info_url:
      "http://askin.co.kr/product/에이스킨-휴미드-인텐시브-로션/19/category/65/display/1/#prdDetail",
    ingredients: [
      {
        ewg_grade: 1,
        name: "정제수"
      },
      {
        ewg_grade: 2,
        name: "글리세린"
      },
      {
        ewg_grade: 1,
        name: "올리브오일"
      }
    ],
    name: "에이스킨 휴미드 인텐시브 로션",
    price: 31000,
    reviews: [
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/reviews/1/"
    ],
    selling: false,
    temp_opening_discount: 0,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/1/"
  },
  {
    brand: {
      name: "에이스킨",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/1/"
    },
    capacity: 100,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 2,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/2.jpg",
    info_country: "대한민국",
    info_manufacturer: "휴먼코스메틱(주)",
    info_seller: "휴먼코스메틱(주)",
    info_url:
      "http://askin.co.kr/product/에이스킨-휴미드-인텐시브-크림/23/category/65/display/1/#prdDetail",
    ingredients: [
      {
        ewg_grade: 1,
        name: "정제수"
      },
      {
        ewg_grade: 2,
        name: "글리세린"
      },
      {
        ewg_grade: 1,
        name: "카프릴릭/카프릭트리글리세라이드"
      }
    ],
    name: "에이스킨 휴미드 인텐시브 크림",
    price: 32000,
    reviews: [],
    selling: false,
    temp_opening_discount: 0,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/2/"
  },
  {
    brand: {
      name: "에이스킨",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/1/"
    },
    capacity: 15,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 3,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/3.jpg",
    info_country: "대한민국",
    info_manufacturer: "휴먼코스메틱(주)",
    info_seller: "휴먼코스메틱(주)",
    info_url:
      "http://askin.co.kr/product/에이스킨-리바이탈라이즈-엠지에프-리페어크림/24/category/65/display/1/#prdDetail",
    ingredients: [
      {
        ewg_grade: 1,
        name: "정제수"
      },
      {
        ewg_grade: 2,
        name: "글리세린"
      }
    ],
    name: "에이스킨 리바이탈라이즈 엠지에프 리페어크림",
    price: 22000,
    reviews: [],
    selling: false,
    temp_opening_discount: 0,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/3/"
  },
  {
    brand: {
      name: "에이스킨",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/1/"
    },
    capacity: 50,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 4,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/4.jpg",
    info_country: "대한민국",
    info_manufacturer: "휴먼코스메틱()",
    info_seller: "휴먼코스메틱(주)",
    info_url:
      "http://askin.co.kr/product/에이스킨-리바이탈라이즈-엠지에프-플러스-크림/15/category/65/display/1/#prdDetail",
    ingredients: [],
    name: "에이스킨 리바이탈라이즈 엠지에프 플러스크림",
    price: 58000,
    reviews: [],
    selling: false,
    temp_opening_discount: 0,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/4/"
  },
  {
    brand: {
      name: "에이스킨",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/1/"
    },
    capacity: 50,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 5,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/5.jpg",
    info_country: "대한민국",
    info_manufacturer: "휴먼코스메틱(주)",
    info_seller: "휴먼코스메틱(주)",
    info_url:
      "http://askin.co.kr/product/에이스킨-수딩-코코-워터리-크림/29/category/65/display/1/#prdDetail",
    ingredients: [],
    name: "에이스킨 수딩 코코 워터리 크림",
    price: 25000,
    reviews: [],
    selling: false,
    temp_opening_discount: 0,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/5/"
  },
  {
    brand: {
      name: "레꽁쁠레",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/2/"
    },
    capacity: 200,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 6,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/6.jpg",
    info_country: "프랑스",
    info_manufacturer: "LES COMPLEXES",
    info_seller: "레꽁쁠레코리아",
    info_url:
      "http://itempage3.auction.co.kr/DetailView.aspx?itemno=B463945053",
    ingredients: [],
    name: "레꽁쁠레 하이드라썬 수분크림",
    price: 130000,
    reviews: [],
    selling: true,
    temp_opening_discount: 10000,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/6/"
  },
  {
    brand: {
      name: "닥터벨타",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/3/"
    },
    capacity: 100,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 7,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/7.jpg",
    info_country: "독일",
    info_manufacturer: "DR.BELTER COSMETIC",
    info_seller: "포센느",
    info_url:
      "https://smartstore.naver.com/fromyn/products/2312556156?NaPm=ct%3Djra4tokw%7Cci%3D7b73a896e800a619a72e24f01afe0e09dfdb5f23%7Ctr%3Dsls%7Csn%3D606463%7Chk%3Da96bafcb10f64b099c731fc563233bfb6fadcbe5",
    ingredients: [],
    name: "닥터벨타 카로틴크림",
    price: 140000,
    reviews: [],
    selling: true,
    temp_opening_discount: 10000,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/7/"
  },
  {
    brand: {
      name: "셀뮬러",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/4/"
    },
    capacity: 50,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 8,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/8.jpg",
    info_country: "대한민국",
    info_manufacturer: "(주)코스메카코리아",
    info_seller: "(주)은성글로벌",
    info_url:
      "http://itempage3.auction.co.kr/DetailView.aspx?ItemNo=B489131677&frm3=V2",
    ingredients: [],
    name: "셀뮬러 리페어크림",
    price: 42000,
    reviews: [],
    selling: true,
    temp_opening_discount: 10000,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/8/"
  },
  {
    brand: {
      name: "페이스모아",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/5/"
    },
    capacity: 80,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 9,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/9.jpg",
    info_country: "대한민국",
    info_manufacturer: "상세정보 참조",
    info_seller: "상세정보 참조",
    info_url:
      "http://itempage3.auction.co.kr/DetailView.aspx?itemno=B598592747",
    ingredients: [],
    name: "로제 뮤 크림",
    price: 55000,
    reviews: [],
    selling: true,
    temp_opening_discount: 10000,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/9/"
  },
  {
    brand: {
      name: "뷰티메드",
      url:
        "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/brands/6/"
    },
    capacity: 150,
    category:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/categories/1/",
    id: 10,
    image:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/media/10.jpg",
    info_country: "프랑스",
    info_manufacturer: "BEUTY MED S.A.S",
    info_seller: "BEUTY MED S.A.S",
    info_url:
      "http://beautymedmall.com/product/detail.html?product_no=78&cate_no=42&display_group=1",
    ingredients: [],
    name: "뷰티메드 하이드레이팅 크림",
    price: 120000,
    reviews: [],
    selling: true,
    temp_opening_discount: 10000,
    url:
      "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/products/10/"
  }
];

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    };
  };
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { products }
        }
      }
    } = props;
    this.state = {
      products,
      loading: true,
      products: null
    };
  }

  async componentDidMount() {
    let products = fakeData; //[];
    try {
      // for (let i = 0; i < products.length; i++) {
      //   let json = await getProduct(products[i]);
      //   products.push(json);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
        products
      });
    }
  }
  render() {
    const { loading, products } = this.state;
    if (loading) return <Loader />;
    return <ProductListPresenter products={products} />;
  }
}
