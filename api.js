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

export const login = async info => {
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
      `http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/o/token/?username=${
        info.username
      }&password=${
        info.password
      }&grant_type=password&client_id=yg30yWvkbNXIjDbA4mDLimNkyCgZpriBy6c5k8yU&client_secret=4yRNL6m1LUsHPP8ohiDLfnnPVQ8Vikh1EMGYSRhsTKzDRZoAKYZm2HZPe4Ls9HTJuTwjJddcFJmivKCVtAve5yPzmJ9M6pO5XGmh3DmARscXu4L8cRSrk8XpkoXHYFZW`
    )
    xhr.onload = function(e) {
      resolve(xhr.response)
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
  AsyncStorage.setItem("tokens", result);
  const json = JSON.parse(result)
  console.log("token", json)
  const userinfo = await getUserInfo(json, info.username)
  console.log("userinfo", userinfo)
}

export const getUserInfo = async (res, username) => {
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
    }
    xhr.setRequestHeader("Accept", "application/json")

    xhr.send()
  })
  return JSON.parse(result)
}
