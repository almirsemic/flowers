export interface Flowers {
  flowers: Flower[]
  meta: Meta
}

export interface Flower {
  id: number
  name: string
  latin_name: string
  sightings: number
  profile_picture: string
  favorite: boolean
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  current_page: number
  prev_page: null
  next_page: number
  total_pages: number
}

export interface modalType {
  isOpened: boolean
  type?: string
}

export interface registationType {
  email: string
  password: string
  first_name: string
  last_name: string
  date_of_birth: string
}

export interface loginType {
  email: string
  password: string
}

export interface User {
  user: UserInfo
}

export interface UserInfo {
  id: number
  first_name: string
  last_name: string
}
export interface FlowersDetail {
  flower: FlowerDetail
}

export interface FlowerDetail {
  id: number
  name: string
  latin_name: string
  sightings: number
  profile_picture: string
  favorite: boolean
  features: string[]
  description: string
}

export interface UserProfile {
  first_name: string | null
  id: number | null
  last_name: string | null
}
