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
