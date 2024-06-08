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

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}
