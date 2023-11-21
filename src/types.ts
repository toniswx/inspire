export type product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string[];
  sizes: string[];
  rating: {
    rate: number;
    count: number;
  };
  colors: string[];
  _id?: string;
};

type rate = {
  id: string;
  user: string;
  comment: string;
};
export type cartItem = {
  _id?: string;
  size: string | null;
  sizes: string[];
  selectedColor: string | null;
  colors: string[];
  name: string;
  image: string;
  price: number;
  quantity: number;
  id: string;
};
