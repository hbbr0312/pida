import { AsyncStorage } from "react-native"

const BASE_URL =
  "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/"

export const getCategory = () => {
  const url = BASE_URL + "categories"
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error))
}

export const getProduct = url => {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error))
}

export const getReview = url => {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error))
}

export const getFAQ = async () => {
  const url = BASE_URL + "faqs"
  const res = await fetch(url)
  return res.json()
}
export const getNotice = async () => {
  const url = BASE_URL + "notices/"
  const res = await fetch(url)
  return res.json()
}

export const register = async info => {
  let response
  try {
    response = await fetch(BASE_URL + "users/", {
      method: "POST",
      body: JSON.stringify({
        username: info.username,
        password: info.password,
        gender: info.gender,
        age: info.age,
        skin_type: info.skin_type,
        skin_concerns: info.skin_concerns,
        allergies: info.allergies
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
  } catch (err) {
    console.log("error:", err)
  } finally {
    console.log("/response/", response)
    return response
  }
}

export const checkDuplicateId = async email => {
  const response = await fetch(BASE_URL + "users/" + email, {
    method: "GET"
  })
  if (response.status === 401) return false
  else if (response.status === 404) return true
}

export const getTokens = async (username, password) => {
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })

    xhr.open(
      "POST",
      `http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/o/token/?username=${username}&password=${password}&grant_type=password&client_id=yg30yWvkbNXIjDbA4mDLimNkyCgZpriBy6c5k8yU&client_secret=4yRNL6m1LUsHPP8ohiDLfnnPVQ8Vikh1EMGYSRhsTKzDRZoAKYZm2HZPe4Ls9HTJuTwjJddcFJmivKCVtAve5yPzmJ9M6pO5XGmh3DmARscXu4L8cRSrk8XpkoXHYFZW`
    )
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.2")
    xhr.setRequestHeader("Accept", "*/*")
    xhr.setRequestHeader("Cache-Control", "no-cache")
    xhr.setRequestHeader(
      "Postman-Token",
      "e070d598-ee6c-4ac4-a3be-4f9f83dc85d6,3788b544-e1bd-4976-a0fc-8a1e01ee15a7"
    )
    xhr.setRequestHeader(
      "Host",
      "ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com"
    )
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate")
    xhr.setRequestHeader("Content-Length", "")
    xhr.setRequestHeader("Connection", "keep-alive")
    xhr.setRequestHeader("cache-control", "no-cache")

    xhr.send()
  })
  if (status === 200) {
    AsyncStorage.setItem("tokens", result)
    AsyncStorage.setItem("username", username)
    return true
  } else {
    return false
  }
}

export const getUserInfo = async () => {
  const res = await AsyncStorage.getItem("tokens")
  const tokens = JSON.parse(res)
  const username = await AsyncStorage.getItem("username")
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })
    xhr.open(
      "GET",
      `http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/users/${username}/?access_token=${tokens.access_token}`
    )
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }
    xhr.setRequestHeader("Accept", "application/json")

    xhr.send()
  })

  const json = JSON.parse(result)
  return { success: status === 200, result: json }
}

export const islogin = async () => {
  const rawTokens = await AsyncStorage.getItem("tokens")
  if (rawTokens != null) {
    const response = await getUserInfo()
    if (response.success) {
      return true
    } else {
      //token invalid
      return false
    }
  } else {
    return false
  }
}

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("username")
    return true
  } catch (exception) {
    return false
  }
}

export const getPayInfo = async () => {
  const res = await AsyncStorage.getItem("tokens")
  const tokens = JSON.parse(res)
  const userInfo = await getUserInfo()
  const base_url = userInfo.result.default_payment_information
  const url = base_url + "?access_token=" + tokens.access_token
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })

    xhr.open("GET", url)
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send()
  })
  if (status === 200) {
    return JSON.parse(result)
  } else return null
}

export const getAddressInfo = async () => {
  const res = await AsyncStorage.getItem("tokens")
  const tokens = JSON.parse(res)
  const userInfo = await getUserInfo()
  const base_url = userInfo.result.default_delivery_information
  const url = base_url + "?access_token=" + tokens.access_token
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })

    xhr.open("GET", url)
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send()
  })
  if (status === 200) {
    return JSON.parse(result)
  } else return null
}

export const updateUserInfo = async info => {
  const res = await AsyncStorage.getItem("tokens")
  const username = await AsyncStorage.getItem("username")
  const tokens = JSON.parse(res)
  const url =
    BASE_URL + "users/" + username + "/?access_token=" + tokens.access_token
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })

    xhr.open("PATCH", url)
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send(JSON.stringify(info))
  })
  return status === 200
}

export const updatePayInfo = async info => {
  const res = await AsyncStorage.getItem("tokens")
  const userInfo = await getUserInfo()
  const base_url = userInfo.result.default_payment_information
  const tokens = JSON.parse(res)
  const url = base_url + "/?access_token=" + tokens.access_token
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })

    xhr.open("PATCH", url)
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send(JSON.stringify(info))
  })
  return status === 200
}

export const updateDeliveryInfo = async info => {
  const res = await AsyncStorage.getItem("tokens")
  const userInfo = await getUserInfo()
  const base_url = userInfo.result.default_delivery_information
  const tokens = JSON.parse(res)
  const url = base_url + "/?access_token=" + tokens.access_token
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })

    xhr.open("PATCH", url)
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send(JSON.stringify(info))
  })
  return status === 200
}

export const addressSearch = async (keyword, currentPage) => {
  const base = "https://www.juso.go.kr/addrlink/addrLinkApi.do"
  const countPerPage = 100
  const confmKey = "U01TX0FVVEgyMDE5MDgyNzE0NDIwODEwODk4MDI="
  const url = `${base}?confmKey=${confmKey}&currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${keyword}&resultType=json`
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })

    xhr.open("GET", url)
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }

    xhr.send()
  })
  return JSON.parse(result)
}

//TODO
export const getTesterOrder = async () => {
  const res = await AsyncStorage.getItem("tokens")
  const tokens = JSON.parse(res)
  const base_url = BASE_URL + "tester-orders/16" //+ username
  const url = base_url + "/?access_token=" + tokens.access_token
  let status
  const result = await new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.responseText)
      }
    })

    xhr.open("GET", url)
    xhr.onload = function(e) {
      resolve(xhr.response)
      status = xhr.status
    }
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send()
  })
  console.log(result)
  if (status === 200) {
    return JSON.parse(result)
  } else return null
}
