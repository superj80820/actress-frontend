export interface actress {
  id: string;
  image: string;
  name: string;
  detail: string;
  romanization?: string;
}

export interface actressesWithPagination {
  isEnd: boolean
  total: number
  page: number
  limit: number
  actresses: actress[]
}

export interface actressAPIRepo {
  getActressByID(actressID: string): Promise<actress>
  getFavorites(page: number, limit: number, token: string): Promise<actressesWithPagination>
  searchActressByFace(image_file: File, token: string): Promise<actress[]>
  searchActressByName(name: string, page: number, limit: number, token: string): Promise<actressesWithPagination>
  addFavorite(actressID: string, token: string): Promise<void>
  removeFavorite(actressID: string, token: string): Promise<void>
}
