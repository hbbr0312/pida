import { AsyncStorage } from "react-native";

export const priceParser = price => {
  const str = new String(price);
  const array = str.split("");
  let newPrice = "";
  const leng = array.length;
  for (var i = 1; i <= leng; i++) {
    if (i % 3 === 0 && i !== leng) {
      newPrice = "," + array[leng - i] + newPrice;
    } else {
      newPrice = array[leng - i] + newPrice;
    }
  }
  return `₩ ${newPrice}`;
};

export const loadCart = async () => {
  try {
    const cart = await AsyncStorage.getItem("cart");
    const parsedCart = JSON.parse(cart);
    return parsedCart || [];
  } catch (err) {
    console.log(err);
  }
};

export const vacateCart = () => {
  AsyncStorage.setItem("cart", "[]");
};

export const put2cart = async (product, number) => {
  const item = {
    id: product.id,
    name: product.name,
    number: number,
    image: product.image,
    price: product.price
  };
  try {
    const cart = await loadCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        return 0;
      }
    }
    cart.push(item);
    AsyncStorage.setItem("cart", JSON.stringify(cart));
    return 1;
  } catch (err) {
    console.log(err);
  }
};

export const loadPalette = async () => {
  try {
    const palette = await AsyncStorage.getItem("palette");
    const parsedPalette = JSON.parse(palette);
    return parsedPalette || [];
  } catch (err) {
    console.log(err);
  }
};

export const paletteSelect = number => {
  const palette = {
    size: number,
    selected: []
  };
  AsyncStorage.setItem("palette", JSON.stringify(palette));
};

export const add2palette = async product => {
  const item = {
    id: product.id,
    name: product.name
  };
  try {
    const palette = await loadPalette();
    const filled = countSelected(palette);
    if (filled === palette.size) {
      alert("이미 팔레트가 꽉 찼습니다.");
    } else {
      for (var i = 0; i < filled; i++) {
        if (palette.selected[i].id === item.id) {
          alert("이미 담긴 상품입니다.");
          return palette;
        }
      }
      palette.selected.push(item);
      AsyncStorage.setItem("palette", JSON.stringify(palette));
      alert("테스터를 담았습니다.");
    }
    return palette;
  } catch (err) {
    console.log(err);
  }
};

export const initializePalette = () => {
  AsyncStorage.setItem("palette", JSON.stringify({}));
};

export const countSelected = palette => {
  return palette.selected.length;
};

export const removeTester = (id, palette) => {
  const filtered = palette.selected.filter(item => item.id !== id);
  const newPalette = {
    size: palette.size,
    selected: filtered
  };
  AsyncStorage.setItem("palette", JSON.stringify(newPalette));
  return newPalette;
};
