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
export interface AddFlowerFavorite {
  fav_flower: AddFavFlower;
}
export interface AllFlowersFavorite {
  fav_flowers: AddFavFlower[]
}
export interface AddFavFlower {
  id:      number;
  user_id: number;
  flower:  AddFavorite;
}

export interface AddFavorite {
  id:              number;
  name:            string;
  latin_name:      string;
  sightings:       number;
  profile_picture: string;
  favorite:        boolean;
  features:        string[];
  description:     null | string;
}

export interface favoriteFlowersState {
  id: number, 
  flower_id: number,
  type: string,
  name?: string,
  latin_name?: string,
  sightings?: number,
  profile_picture?: string
}

export interface typeToast {
  toast: boolean
  message: string
  color: string
}
export interface Sightings {
  sightings: Sighting[];
  meta:      Meta;
}

export interface Sighting {
  id:             number;
  name:           string;
  description:    string;
  picture:        string;
  likes_count:    number;
  comments_count: number;
  created_at:     Date;
  latitude:       number;
  longitude:      number;
  user:           UserSighting;
  flower:         FlowerSighting;
}

export interface FlowerSighting {
  id:              number;
  name:            string;
  latin_name:      string;
  profile_picture: string;
}

export interface UserSighting {
  id:        number;
  full_name: string;
}
