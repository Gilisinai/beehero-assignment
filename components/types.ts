export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    name: string
  }
}
