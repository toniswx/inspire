"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { product } from "@/types";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { useCartStore } from "../../store/store";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserData } from "@/store/userdata.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cartItem } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const [products, setProducts] = useState<product[] | null>(null);
  const [curretIndex, setCurrentIndex] = useState(0);
  const [mouseIsActive, setMouseActive] = useState(false);
  const [changeGlobalIndex, setChangeGlobalIndex] = useState<null | number>(
    null
  );

  //work-around but try to solve this
  const [domLoaded, setDomLoaded] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setDomLoaded(true);
    const items = [
      {
        id: 1,
        title: "Essnce Plus Gola Xaile Frente Aberta Blazer",
        price: 91.76,
        description: "",
        category: "Roupas Femininas",
        colors: ["blue", "red", "yellow"],
        sizes: ["S", "M", "G"],
        image: [
          "https://img.ltwebstatic.com/images3_pi/2023/08/07/1b/1691390097cc0c8ca8b881603e515783c85dc8470f_thumbnail_600x.webp",
          "https://img.ltwebstatic.com/images3_pi/2023/08/07/be/169139010480cbfb43120f784cf09e4246ec1c609d_thumbnail_600x.webp",
        ],
        rating: {
          rate: 5,
          count: 0,
        },
      },
      {
        id: 1,
        title: "yellow shirt",
        price: 91.76,
        description: "",
        category: "Roupas Femininas",
        colors: ["blue", "red", "yellow"],
        sizes: ["S", "M", "G"],

        image: [
          "https://img.lojasrenner.com.br/item/570599406/large/1.jpg",
          "https://img.lojasrenner.com.br/item/570599406/large/2.jpg",
        ],
        rating: {
          rate: 5,
          count: 0,
        },
      },
    ];
    const x = JSON.stringify(items);
    const parse = JSON.parse(x);
    setProducts(parse);
  }, []);

  let format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });

  const setUserData = useUserData((state) => state.setUserData);
  const setGlobalLoadingStateForUserFetchingData = useUserData(
    (state) => state.switchLoadingState
  );
  const cartItems = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItemToCart);
  const deleteItemFromArray = useCartStore((state) => state.deleteItemFromCart);

  useEffect(() => {
    let total = 0;
    for (let K in cartItems) {
      total = total + cartItems[K].price;
    }

    setTotalValue(total);
  }, [cartItems.length, addItem, deleteItemFromArray, domLoaded]);

  const handleAddItemToCart = (newItem: cartItem) => {
    const findIfItemIsAlreadInCart = cartItems.find((item) => {
      return item.name === newItem.name;
    });
    if (findIfItemIsAlreadInCart) {
      console.log("item is alread into the cart");
    } else {
      console.log("THIS IS GHEREREE");
      addItem({
        name: newItem.name,
        image: newItem.image[0],
        price: newItem.price,
        id: newItem.id,
        quantity: 1,
        colors: newItem.colors,
        selectedColor: newItem.colors[0],
        size: "S",
        sizes: newItem.sizes,
      });
    }
  };
  const updateItemIntoCart = (newItem: cartItem) => {
    const OldItem = cartItems.find((item) => {
      return item.name === newItem.name;
    });

    if (OldItem)
      addItem({
        name: OldItem.name,
        image: OldItem.image[0],
        price: OldItem.price,
        id: OldItem.id,
        quantity: OldItem.quantity,
        colors: OldItem.colors,
        selectedColor: OldItem.selectedColor,
        size: OldItem.size,
        sizes: OldItem.sizes,
      });
  };

  useEffect(() => {
    fetch("http://localhost:3030/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Authorization",
      }, // include, *same-origin, omit
      // body data type must match "Content-Type" header
    })
      .then((data) => data.json())
      .then((resp) => {
        if (resp.sucess === true) {
          setUserData(resp.data);
          setGlobalLoadingStateForUserFetchingData(false);
        } else if (resp.sucess === false) {
          setGlobalLoadingStateForUserFetchingData(false);
          setUserData(undefined);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className=" 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-2  grid grid-cols-1 items-center justify-center gap-2 mx-8 w-10/12  mt-20">
        {products === null
          ? "Loading..."
          : products.map((item, _index) => {
              return (
                <div
                  className="  flex  w-full  h-full  transition-all cursor-pointer mr-11 "
                  key={_index}
                >
                  <div className="w-full p-2 flex flex-col justify-between">
                    <div className="w-full h-96 relative   items-center justify-center flex   mb-4 transition-all  ">
                      <Image
                        onMouseEnter={() => {
                          setChangeGlobalIndex(_index);
                        }}
                        onMouseLeave={() => {
                          setChangeGlobalIndex(null);
                        }}
                        draggable
                        src={
                          _index !== changeGlobalIndex
                            ? item.image[0]
                            : item.image[curretIndex]
                        }
                        width={1000}
                        height={400}
                        alt={item.title}
                        className={
                          changeGlobalIndex === _index
                            ? " w-full h-full absolute left-0 object-cover transition delay-700 duration-700  opacity-0"
                            : " w-full h-full absolute left-0 object-cover "
                        }
                        unoptimized
                      />
                      <Image
                        draggable
                        src={item.image[1]}
                        width={1000}
                        height={400}
                        alt={item.title}
                        className=" w-full h-full object-cover  transition-all"
                        unoptimized
                      />
                      <Button
                        onClick={() => {
                          handleAddItemToCart({
                            name: item.title,
                            image: item.image,
                            price: item.price,
                            id: item.id,
                            quantity: 1,
                            colors: item.colors,
                            selectedColor: "yellow",
                            size: item.sizes[0],
                            sizes: item.sizes,
                          });
                        }}
                        onMouseEnter={() => {
                          setChangeGlobalIndex(_index);
                        }}
                        onMouseLeave={() => {
                          setChangeGlobalIndex(null);
                        }}
                        className={
                          changeGlobalIndex === _index
                            ? "absolute bottom-2 opacity-100 "
                            : "opacity-0 absolute "
                        }
                      >
                        Add to cart
                      </Button>
                    </div>
                    <div className="my-2">
                      <p className="font-semibold text-xs ">{item.category}</p>
                      <h2 className=" text-xs   cursor-pointer  line-clamp-1 my-2">
                        {item.title}
                      </h2>

                      <p className="  line-clamp-1 cursor-pointer font-bold">
                        {format.format(item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
