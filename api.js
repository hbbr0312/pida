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
