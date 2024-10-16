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
      spaces: string
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
      spaces: string
    }
    path: string
  }
  
  export type ReviewParams = {
  userId: string;
  parkingId: string;  // Change this from parking object to just parkingId
  review: string;
  };

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
    imageUrl: string
    location: string
    startDateTime: Date
    endDateTime: Date
    spaces: string
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
    buyerId: string
  }
  
  export type CreateOrderParams = {
    order:{
      vehicleName: string;
      vehicleCompany: string;
      vehicleNumber: string;
      vehicleType?: string;
      startDateTime: Date;
      endDateTime: Date;
    }
    parkingId: string;
    buyerId: string;
  }
  
  export type GetOrdersByParkingParams =  {
    searchString: string
    parkingId: string
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

  export type FAQParams = {
    question: string
    answer: string
  }