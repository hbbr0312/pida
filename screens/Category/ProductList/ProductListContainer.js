import React from "react";
import { getProduct } from "../../../api";
import Loader from "../../../components/Loader";
import ProductListPresenter from "./ProductListPresenter";
import { AsyncStorage } from "react-native";

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
      palette: {},
      navigation: props.navigation
    };
  }

  async componentDidMount() {
    let products, palette;
    try {
      products = await this._loadProducts();
      palette = await this._loadPalette();
    } catch {
    } finally {
      this.setState({
        loading: false,
        products,
        palette: palette || {}
      });
    }
  }

  _loadProducts = async () => {
    const { urls } = this.state;
    let products = [];
    try {
      for (let i = 0; i < urls.length; i++) {
        let json = await getProduct(urls[i]);
        products.push(json);
      }
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  _loadPalette = async () => {
    try {
      const palette = await AsyncStorage.getItem("palette");
      const parsedPalette = JSON.parse(palette);
      return parsedPalette;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { loading, products, navigation, palette } = this.state;
    console.log(palette);
    if (loading) return <Loader />;
    return <ProductListPresenter products={products} navigation={navigation} />;
  }
}
