import gql from "graphql-tag";

export const CATEGORY = gql`
  {
    categories @rest(type: "[Category]", path: "categories/") {
      catergory @rest(type: "Category", path: "categories/") {
        id
        big_name
        name
        products
        name
      }
    }
  }
`;
