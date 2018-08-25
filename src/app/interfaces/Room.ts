export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  images: Array<RoomImage>;
}

export interface RoomImage {
  id: number;
  uri: string;
  alt: string;
}
