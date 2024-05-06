export interface actress {
  id: string;
  image: string;
  name: string;
  detail: string;
  romanization?: string;
}

export interface actressAPIRepo {
  getActressByID(actressID: string): Promise<actress>
  getFavorites(token: string): Promise<actress[]>
  searchActressByFace(image_file: File, token: string): Promise<actress[]>
  searchActressByName(name: string, token: string): Promise<actress[]>
  addFavorite(actressID: string, token: string): Promise<void>
  removeFavorite(actressID: string, token: string): Promise<void>
}
