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
  let response
  const client_id = "yg30yWvkbNXIjDbA4mDLimNkyCgZpriBy6c5k8yU"
  const grant_type = "password"
  const client_secret =
    "4yRNL6m1LUsHPP8ohiDLfnnPVQ8Vikh1EMGYSRhsTKzDRZoAKYZm2HZPe4Ls9HTJuTwjJddcFJmivKCVtAve5yPzmJ9M6pO5XGmh3DmARscXu4L8cRSrk8XpkoXHYFZW"
  const strParams =
    "username=" +
    info.username +
    "&password=" +
    info.password +
    "&grant_type=" +
    grant_type +
    "&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret
  try {
    response = await fetch(BASE_URL + "o/token/" + "?" + strParams, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (err) {
    console.log("error:", err)
  } finally {
    console.log("/response/", response)
    console.log("/access_token/", response.access_token)
    console.log("/refresh_token/", response.refresh_token)
    return response
  }
}
