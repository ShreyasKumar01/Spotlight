export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }
  
  // ====== PARKING PARAMS
  export type CreateParkingParams = {
    userId: string
    parking: {
      name: string
      description: string
      location: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      cityId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type UpdateParkingParams = {
    userId: string
    parking: {
      _id: string
      name: string
      imageUrl: string
      description: string
      location: string
      startDateTime: Date
      endDateTime: Date
      cityId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type DeleteParkingParams = {
    parkingId: string
    path: string
  }
  
  export type GetAllParkingsParams = {
    query: string
    city: string
    limit: number
    page: number
  }
  
  export type GetParkingsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedParkingsByCityParams = {
    cityId: string
    parkingId: string
    limit?: number
    page: number | string
  }
  
  export type Parking = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    imageUrl: string
    location: string
    startDateTime: Date
    endDateTime: Date
    url: string
    organizer: {
      _id: string
      firstName: string
      lastName: string
    }
    city: {
      _id: string
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCityParams = {
    cityName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    parkingName: string
    parkingId: string
    price: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    parkingId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByParkingParams = {
    parkingId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }