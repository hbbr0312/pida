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
    console.log(parsedCart);
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
    cart.push(item);
    AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.log(err);
  }
};
