"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
type itemProps = {
  title: string;
  price: number;
  image: string;
  quantity: number;
};
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useUserData } from "@/store/userdata.store";
import { useCartStore } from "@/store/store";
import { cartItem } from "@/types";
import { Minus, Plus } from "lucide-react";

function item() {
  const route = useRouter();
  const userData = useUserData((state) => state.user);
  const cartItems = useCartStore((state) => state.cart);
  const cartState = useCartStore((state) => state.loading);
  const addItem = useCartStore((state) => state.addItemToCart);
  const totalValue = useCartStore((state) => state.handleSetTotal);
  const deleteItemFromArray = useCartStore((state) => state.deleteItemFromCart);
  const setNewCart = useCartStore((state) => state.setNewCart);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    if (userData === undefined) return;
    if (cartState === true) return;
    fetch("http://localhost:3030/update/usercart", {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email: userData.email, cart: cartItems }),
    });
  }, [cartItems]);

  useEffect(() => {
    let total = 0;
    for (let K in cartItems) {
      total = total + cartItems[K].price * cartItems[K].quantity;
    }

    totalValue(total);
  }, [cartItems, addItem, deleteItemFromArray]);

  let format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });

  const deleteItemFromCart = (itemToDelete: cartItem) => {
    const filteredArray = cartItems.filter((item) => {
      return item.name !== itemToDelete.name;
    });
    if (filteredArray) {
      deleteItemFromArray(filteredArray);
    } else {
    }
  };

  const handleAddItem = (item: cartItem) => {
    item.quantity = item.quantity + 1;

    console.log(item);
    const checkIfItemExistsInCart = cartItems.find((x) => x.name === item.name);

    if (checkIfItemExistsInCart) {
      const newCart = cartItems;

      const index = newCart.findIndex((x) => x.name == item.name);
      // Make sure the index is found, than replace it
      if (index > -1) {
        newCart.splice(index, 1, item);
        setNewCart(newCart);
      }
    } else {
      addItem(item);
    }
  };
  const handleSubtrac = (item: cartItem) => {
    if (item.quantity === 1) {
      return;
    } else {
      item.quantity = item.quantity - 1;
      const checkIfItemExistsInCart = cartItems.find(
        (x) => x.name === item.name
      );

      if (checkIfItemExistsInCart) {
        const newCart = cartItems;
        const index = newCart.findIndex((x) => x.name == item.name);
        // Make sure the index is found, than replace it
        if (index > -1) {
          newCart.splice(index, 1, item);
          setNewCart(newCart);
        }
      } else {
        addItem(item);
      }
    }
  };

  return (
    <>
      <div className=" w-full h-1/2  ">
        <Table className="hidden md:block">
          <TableCaption>Seu cart</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Item</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Tamanho/Cor</TableHead>
              <TableHead>Quantidade</TableHead>

              <TableHead className="text-right">Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item: cartItem) => {
              return (
                <TableRow>
                  <TableCell className="font-medium transition-all">
                    <Image
                      className="object-cover w-full h-full"
                      src={item.image}
                      alt={"product image"}
                      width={1000}
                      height={1200}
                    />
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      route.push("/home/product/" + item._id);
                    }}
                    className="cursor-pointer hover:font-bold transition-all"
                  >
                    {item.name}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div className="flex  items-center justify-center my-1  w-fit  py-1 rounded-full">
                      <div className="text-xs font-bold">
                        <p>{item.size} /</p>
                      </div>

                      <div className="w-5 h-5 mx-1 p-[1px]  rounded-full border ">
                        <div
                          className="w-full h-full rounded-full "
                          style={{
                            backgroundColor: item!.selectedColor!,
                          }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="border w-28 h-full flex items-center justify-between shadow-sm transition-all ">
                      <div
                        onClick={() => {
                          handleSubtrac({
                            name: item.name,
                            image: item.image,
                            price: item.price,
                            id: item.id,
                            quantity: item.quantity,
                            colors: item.colors,
                            selectedColor: item.selectedColor,
                            size: item.size,
                            sizes: item.sizes,
                            _id: item._id,
                          });
                        }}
                        className="border-r flex items-center justify-normal h-full  hover:bg-white text-sm active:bg-neutral-50 p-1 cursor-pointer "
                      >
                        <Minus size={16} strokeWidth={2} />
                      </div>
                      <div>{item.quantity}</div>
                      <div
                        onClick={() => {
                          handleAddItem({
                            name: item.name,
                            image: item.image,
                            price: item.price,
                            id: item.id,
                            quantity: item.quantity,
                            colors: item.colors,
                            selectedColor: item.selectedColor,
                            size: item.size,
                            sizes: item.sizes,
                            _id: item._id,
                          });
                        }}
                        className="border-l flex items-center justify-normal h-full hover:bg-white active:bg-neutral-50 p-1  text-sm cursor-pointer transition-all"
                      >
                        <Plus size={16} strokeWidth={2} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {format.format(item.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => {
                        deleteItemFromCart({
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          id: item.id,
                          quantity: 1,
                          colors: item.colors,
                          selectedColor: item.selectedColor,
                          size: item.size,
                          sizes: item.sizes,
                          _id: item._id,
                        });
                      }}
                      size={"icon"}
                      variant={"destructive"}
                      className="h-5 w-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-trash-2"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="md:hidden">
        {cartItems.map((item: cartItem) => {
          return (
            <div className="flex flex-col justify-start items-start p-3 border">
              <div className="font-medium transition-all justify-start object-contain flex items-start bg ">
                <Image
                  className="object-contain h-full "
                  src={item.image}
                  alt={"product image"}
                  width={1000}
                  height={1200}
                />
              </div>
              <div
                onClick={() => {
                  route.push("/home/product/" + item._id);
                }}
                className="cursor-pointer hover:font-bold transition-all py-4 "
              >
                {item.name}
                <div className="flex  items-center justify-center my-1  w-fit  py-1 rounded-full">
                  <div className="text-lg font-bold">
                    <p>{item.size} /</p>
                  </div>

                  <div className="w-7 h-7 mx-1 p-[1px]  rounded-full border ">
                    <div
                      className="w-full h-full rounded-full "
                      style={{
                        backgroundColor: item!.selectedColor!,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div> </div>
              <div className="text-right w-full h-16">
                <div className="border  h-full flex items-center justify-between shadow-sm transition-all  ">
                  <div
                    onClick={() => {
                      handleSubtrac({
                        name: item.name,
                        image: item.image,
                        price: item.price,
                        id: item.id,
                        quantity: item.quantity,
                        colors: item.colors,
                        selectedColor: item.selectedColor,
                        size: item.size,
                        sizes: item.sizes,
                        _id: item._id,
                      });
                    }}
                    className="border-r flex items-center justify-center w-1/4 h-full  hover:bg-white text-sm active:bg-neutral-50 p-1 cursor-pointer "
                  >
                    <Minus size={16} strokeWidth={2} />
                  </div>
                  <div className="text-lg">{item.quantity}</div>
                  <div
                    onClick={() => {
                      handleAddItem({
                        name: item.name,
                        image: item.image,
                        price: item.price,
                        id: item.id,
                        quantity: item.quantity,
                        colors: item.colors,
                        selectedColor: item.selectedColor,
                        size: item.size,
                        sizes: item.sizes,
                        _id: item._id,
                      });
                    }}
                    className="border-l flex items-center justify-center w-1/4 h-full hover:bg-white active:bg-neutral-50 p-1  text-sm cursor-pointer transition-all"
                  >
                    <Plus size={16} strokeWidth={2} />
                  </div>
                </div>
              </div>
              <TableCell className=" flex justify-between w-full mt-10">
                <p className="text-2xl font-semibold"> {format.format(item.price)}</p>
                <Button
                  onClick={() => {
                    deleteItemFromCart({
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      id: item.id,
                      quantity: 1,
                      colors: item.colors,
                      selectedColor: item.selectedColor,
                      size: item.size,
                      sizes: item.sizes,
                      _id: item._id,
                    });
                  }}
                  size={"icon"}
                  variant={"destructive"}
                  className="h-5 w-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </Button>
              </TableCell>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
}

export default item;

/*{cartItems.map((item: cartItem) => {
          return (
            <>
              <div
                key={item.id}
                className="w-full mt-8  flex justify-between  rounded-md  "
              >
                <div className=" w-fit flex-col justify-between   pr-4">
                  <div>
                    <p className=" w-full h-fit text-xs line-clamp-2">
                      {item.name}
                    </p>

                    <div className="flex  items-center justify-center my-1  w-fit  py-1 rounded-full">
                      <div className="text-xs font-bold">
                        <p>
                          Tamanho : {item.size} / Quantidade : {item.quantity}
                        </p>
                      </div>

                      <div className="w-5 h-5 mx-1 p-[1px]  rounded-full border ">
                        <div
                          className="w-full h-full rounded-full "
                          style={{
                            backgroundColor: item!.selectedColor!,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full ">
                    <div className="flex ">
                      <p>{format.format(item.price)}</p>
                    </div>

                    <Button
                      onClick={() => {
                        deleteItemFromCart({
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          id: item.id,
                          quantity: 1,
                          colors: item.colors,
                          selectedColor: item.selectedColor,
                          size: item.size,
                          sizes: item.sizes,
                        });
                      }}
                      size={"icon"}
                      variant={"destructive"}
                      className="h-7"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-trash-2"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className=" w-2/4 object-contain bg-slate-600 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={item.image}
                    alt={"product image"}
                    width={1000}
                    height={1200}
                  />
                </div>
              </div>
            </>
          );
        })} */
