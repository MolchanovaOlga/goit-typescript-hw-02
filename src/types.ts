export interface Urls {
  small: string;
  regular: string;
}

export interface Image {
  id: number;
  urls: Urls;
  alt_description: string;
  description: string;
  likes: number;
  user: { name: string; location: string };
}

export interface ModalData {
  regular: string;
  alt_description: string;
  description: string;
}

export interface ResponseData {
  total: number;
  results: Image[];
}
