export type product = {
    id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
      rate: number,
      count: number
    }
    colors:string[]

  }

export type cartItem = {
    selectedColor:string | null
    colors: string[];
    name: string;
    image: string;
    price:number,
    quantity:number,
    id:string
  };