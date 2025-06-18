import { gql

 } from "@apollo/client";

export const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant(
    $name: String!
    $address: String!
    $description: String!
    $phone: String!
    $email: String!
    $latitude: Float!
    $longitude: Float!
    $openTime: String!
    $closingTime: String!
    $coverPhoto: String!
  ) {
    createRestaurant(
      name: $name
      description: $description
      phone: $phone
      email: $email
      address: $address
      latitude: $latitude
      longitude: $longitude
      openTime: $openTime
      closingTime: $closingTime
      coverPhoto: $coverPhoto
    ) {
      error
      message
      data {
        name
        email
        phone
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
mutation($status: String! $uuid: String!) {
  updateOrder(status: $status, uuid: $uuid){
    message
    error
    data {
      orderNo
      status
      orderItems {
        title
        photos
        quantity
        price
      }
    }
  }
}`
;