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

export const register = async (username, password) => {
  let response;
  try {
    response = await fetch(BASE_URL + "users/", {
      method: "POST",
      body: JSON.stringify({
        username: "username",
        password: "password",
        gender: 1,
        age: 2,
        skin_type: 3,
        skin_concerns: [],
        allergies: []
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
