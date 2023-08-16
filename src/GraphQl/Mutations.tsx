import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Int!, $quantity: Int!, $id: String!) {
    insert_products_one(object: {name: $name, price: $price, quantity: $quantity, id: $id}) {
      id
      name
      price
      quantity
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($name: String!, $price: Int!, $quantity: Int!, $id: String!) {
    update_products_by_pk(pk_columns: {id: $id}, _set: {name: $name, price: $price, quantity: $quantity}) {
      price
      name
      quantity
      id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    delete_products(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;