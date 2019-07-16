import React from "react";
import { getProduct } from "../../../api";
import Loader from "../../../components/Loader";
import ProductListPresenter from "./ProductListPresenter";

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
      urls: products,
      products: [],
      loading: true,
      products: products,
      navigation: props.navigation
    };
  }

  async componentDidMount() {
    const { urls } = this.state;
    let products = [];
    try {
      for (let i = 0; i < urls.length; i++) {
        let json = await getProduct(urls[i]);
        products.push(json);
      }
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
    const { loading, products, navigation } = this.state;
    console.log(products);
    if (loading) return <Loader />;
    return <ProductListPresenter products={products} navigation={navigation} />;

    // return (
    //   <Query query={PRODUCT} variables={{ id: 1 }}>
    //     {({ loading, error, data }) => {
    //       if (loading) return <Loader />;
    //       if (error) {
    //         console.log(error);
    //         return null;
    //       }
    //       console.log(data);
    //       return null;
    //     }}
    //   </Query>
    //);
  }
}
