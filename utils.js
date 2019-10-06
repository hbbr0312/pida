import { AsyncStorage } from "react-native"

export const priceParser = price => {
  const str = new String(price)
  const array = str.split("")
  let newPrice = ""
  const leng = array.length
  for (var i = 1; i <= leng; i++) {
    if (i % 3 === 0 && i !== leng) {
      newPrice = "," + array[leng - i] + newPrice
    } else {
      newPrice = array[leng - i] + newPrice
    }
  }
  return `₩ ${newPrice}`
}

export const timeParser = time => {
  //2019-09-02T12:34:23.076689Z
  return {
    year: time.substring(0, 4),
    month: time.substring(5, 7),
    day: time.substring(8, 10),
    time: time.substring(11, 13),
    minute: time.substring(14, 16)
  }
}

export const time2int = raw => {
  const t = timeParser(raw)
  const time = t.year + t.month + t.day + t.time + t.minute
  return Number(time)
}

export const loadCart = async () => {
  try {
    const cart = await AsyncStorage.getItem("cart")
    const parsedCart = JSON.parse(cart)
    return parsedCart || []
  } catch (err) {
    console.log(err)
  }
}

export const vacateCart = () => {
  AsyncStorage.setItem("cart", "[]")
}

export const put2cart = async (product, number) => {
  const item = {
    id: product.id,
    name: product.name,
    number: number,
    image: product.image,
    price: product.price,
    url: product.url
  }
  try {
    const cart = await loadCart()
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        return 0
      }
    }
    cart.push(item)
    AsyncStorage.setItem("cart", JSON.stringify(cart))
    return 1
  } catch (err) {
    console.log(err)
  }
}

export const removeProduct = async id => {
  let cart
  try {
    cart = await loadCart()
    let index = -1
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        index = i
      }
    }
    cart.splice(index, 1)
    AsyncStorage.setItem("cart", JSON.stringify(cart))
  } catch (err) {
    console.log(err)
  } finally {
    return cart
  }
}

export const updateProduct = async (id, number) => {
  let cart
  try {
    cart = await loadCart()
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].number = number
      }
    }
    AsyncStorage.setItem("cart", JSON.stringify(cart))
  } catch (err) {
    console.log(err)
  } finally {
    return cart
  }
}

export const loadPalette = async () => {
  try {
    const palette = await AsyncStorage.getItem("palette")
    const parsedPalette = JSON.parse(palette)
    return parsedPalette || {}
  } catch (err) {
    console.log(err)
  }
}

export const paletteSelect = number => {
  const palette = {
    size: number,
    selected: []
  }
  AsyncStorage.setItem("palette", JSON.stringify(palette))
}

export const add2palette = async product => {
  const item = {
    id: product.id,
    name: product.name
  }
  try {
    const palette = await loadPalette()
    const filled = countSelected(palette)
    if (filled === palette.size) {
      alert("이미 팔레트가 꽉 찼습니다.")
    } else {
      for (var i = 0; i < filled; i++) {
        if (palette.selected[i].id === item.id) {
          alert("이미 담긴 상품입니다.")
          return palette
        }
      }
      palette.selected.push(item)
      AsyncStorage.setItem("palette", JSON.stringify(palette))
      alert("테스터를 담았습니다.")
    }
    return palette
  } catch (err) {
    console.log(err)
  }
}

export const initializePalette = () => {
  AsyncStorage.setItem("palette", JSON.stringify({ size: -1, selected: [] }))
}

export const countSelected = palette => {
  return palette.selected.length
}

export const removeTester = (id, palette) => {
  const filtered = palette.selected.filter(item => item.id !== id)
  const newPalette = {
    size: palette.size,
    selected: filtered
  }
  AsyncStorage.setItem("palette", JSON.stringify(newPalette))
  return newPalette
}

export const getReviewer = url => {
  const list = url.split("/")
  const valid = list.filter(item => item !== "")
  const len = valid.length
  return valid[len - 1]
}
