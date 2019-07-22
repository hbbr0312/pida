import React from "react";
import { getProduct } from "../../../api";
import Loader from "../../../components/Loader";
import ProductListPresenter from "./ProductListPresenter";
import PaletteSelect from "./PaletteSelect";
import { loadPalette, paletteSelect, initializePalette } from "../../../utils";
import PaletteModal from "./PaletteModal";
import { View } from "react-native";

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
      navigation: props.navigation,
      modalVisible: false
    };
  }

  async componentDidMount() {
    let products, palette;
    try {
      products = await this._loadProducts();
      palette = await loadPalette();
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

  _select = size => {
    paletteSelect(size);
    const palette = {
      size: size,
      selected: []
    };
    this.setState({ palette });
  };

  _openModal = () => {
    console.log("openModal");
    this.setState({ modalVisible: true });
  };

  _closeModal = () => {
    console.log("closeModal");
    this.setState({ modalVisible: false });
  };

  render() {
    const { loading, products, navigation, palette, modalVisible } = this.state;
    if (loading) return <Loader />;
    else if (Object.keys(palette).length === 0)
      return <PaletteSelect _select={this._select} />;
    else
      return (
        <>
          <ProductListPresenter
            products={products}
            palette={palette}
            navigation={navigation}
            _openModal={this._openModal}
          />
          <PaletteModal visible={modalVisible} _closeModal={this._closeModal} />
        </>
      );
  }
}
