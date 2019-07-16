import gql from "graphql-tag";

export const CATEGORY = gql`
  query category {
    category @rest(type: "Category", path: "categories/") {
      id
      big_name
      name
      products
      name
    }
  }
`;

export const GROUP_BUYING = gql`
  query groupBuying {
    groupBuying @rest(type: "GroupBuying", path: "group-purchase-events/") {
      url
      id
      orders
      discount_rates
      product
      closing_time
    }
  }
`;

export const PRODUCT = gql`
  query product {
    product(id: $id) @rest(type: "Product", path: "products/{args.id}") {
      id
      reviews
      name
      price
      brand @type(name: "Brand") {
        name
      }
      info_seller
      info_manufacturer
      info_country
      info_url
      image
      ingredients
    }
  }
`;
