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

export const register = async info => {
  let response
  try {
    response = await fetch(BASE_URL + "users/", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        gender: gender,
        age: age,
        skin_type: skin_type,
        skin_concerns: skin_concerns,
        allergies: allergies
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

export const getUserInfo = async (res, username) => {
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
      BASE_URL + "users/" + username + "/?access_token=" + res.access_token
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
  const username = await AsyncStorage.getItem("username")
  const tokens = JSON.parse(rawTokens)
  if (tokens != null) {
    const response = await getUserInfo(tokens, username)
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
