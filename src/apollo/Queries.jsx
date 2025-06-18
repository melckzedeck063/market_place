import { gql } from "@apollo/client";

export const GET_DASHBOARD =gql`
query{
  dashboardStats {
    error
    message
    data {
      totalCustomers
      totalOrders
      totalPendingOrders
      totalAcceptedOrders
      totalCancelledOrders
      myRestaurants
      totalActiveRestaurants
      totalProducts
    }
  }
}
`


export const GET_ALL_ORDERS = gql`
query($page: Int, $size: Int) {
  allOrders(page: $page, size: $size) {
    content {
      createdAt
      latitude
      longitude
      orderItems {
        created_at
        deleted
        description
        ingredients
        photos
        price
        quantity
        title
        updated_at
        uuid
      }
      orderNo
      status
      uuid
      orderedBy {
        firstName
        lastName
        phone
        username
        uuid
      }
    }
    currentPage
    hasNext
    hasPrevious
    size
    totalElements
    totalPages
  }
}
`

export const GET_RESTAURANTS= gql`
  query ($page: Int, $size:Int){
  allRestaurant(page: $page size: $size) {
    currentPage
    hasNext
    hasPrevious
    size
    totalElements
    totalPages
    content {
      address
      closingTime
      description
      email
      id
      latitude
      longitude
      name
      openingDays
      openTime
      coverPhoto
      phone
      status
      updated_at
      uuid
    }
  }
}
`


export const GET_ALL_USERS =  gql`
    query{
  allUsers {
    totalPages
    totalElements
    size
    hasNext
    hasPrevious 
    content {
      active
    created_at
    deleted
    firstName
    id
    lastName
    pageCount
    permissions
    phone
    updated_at
    userType
    username
    uuid
    }
  }
}
`

export const GET_PROFILE = gql`
query {
  profile {
    error
    message
    data {
      firstName
      lastName
      id
      phone
      permissions
      updated_at
      userType
      username
      uuid
    }
  }
}`;