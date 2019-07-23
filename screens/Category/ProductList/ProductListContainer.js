import React from "react";
import { getProduct } from "../../../api";
import Loader from "../../../components/Loader";
import ProductListPresenter from "./ProductListPresenter";
import PaletteSelect from "./PaletteSelect";
import {
  loadPalette,
  paletteSelect,
  initializePalette,
  add2palette
} from "../../../utils";
import PaletteModal from "./components/PaletteModal";
import Detail from "../../Detail/Detail";
import Notice from "../../../components/Notice";

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
      product: {},
      navigation: props.navigation,
      modalVisible: false,
      detailVisible: false
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

  _clearPalette = () => {
    initializePalette();
    this.setState({ palette: {} });
  };

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

  _removeTester = id => {
    const { palette } = this.state;
    const newPallete = removeTester(id, palette);
    this.setState({ palette: newPallete });
  };

  _openModal = () => {
    this.setState({ modalVisible: true });
  };

  _closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _openDetail = product => {
    this.setState({ detailVisible: true, product });
  };

  _closeDetail = () => {
    this.setState({ detailVisible: false });
  };

  _addTester = async product => {
    try {
      const newPalette = await add2palette(product);
      this.setState({ palette: newPalette });
      console.log("addTester");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      loading,
      products,
      navigation,
      palette,
      modalVisible,
      product,
      detailVisible
    } = this.state;
    console.log("is this?", palette);
    if (loading) return <Loader />;
    else if (products.length === 0)
      return <Notice text="상품을 준비중입니다." />;
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
            _openDetail={this._openDetail}
          />
          <Detail
            visible={detailVisible}
            product={product}
            tab="category"
            _closeDetail={this._closeDetail}
            _addTester={this._addTester}
          />
          <PaletteModal
            visible={modalVisible}
            _closeModal={this._closeModal}
            palette={palette}
            _removeTester={this._removeTester}
            _clearPalette={this._clearPalette}
          />
        </>
      );
  }
}
