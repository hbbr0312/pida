import axios from "axios";

const BASE_URL =
  "http://ec2-13-125-246-38.ap-northeast-2.compute.amazonaws.com/";

export const getCategory = () => {
  const url = BASE_URL + "categories";
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
};

export const getProduct = url => {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
};

export const getReview = url => {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
};

export const register = async info => {
  let response;
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
    });
  } catch (err) {
    console.log("error:", err);
  } finally {
    console.log("/response/", response);
    return response;
  }
};

export const login = async info => {
  let response;
  try {
    response = await fetch(BASE_URL + "o/token/", {
      method: "POST",
      body: JSON.stringify({
        username: info.username,
        password: info.password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.log("error:", err);
  } finally {
    console.log("/response/", response);
    return response;
  }
};
