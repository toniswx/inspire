"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useEffect, useState } from "react";
import { product } from "@/types";
import { useCartStore } from "../store/store";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import useGetProducts from "@/hooks/useGetProducts";
import LoginForm from "./loginFormPage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cartItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUserData } from "@/store/userdata.store";
import { useRouter } from "next/navigation";
import Login from "@/app/login";

function ProducsList() {
  const [openLoginModal, setOpenModal] = useState<boolean>(false);
  const [curretIndex, setCurrentIndex] = useState(0);
  const [mouseIsActive, setMouseActive] = useState(false);
  const [PageIndexToOpenModal, setCurrentPageIndexToOpenModal] = useState<
    number | undefined
  >(undefined);

  const [changeGlobalIndex, setChangeGlobalIndex] = useState<null | number>(
    null
  );
  const [open, setOpen] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState<cartItem | null>(null);
  const products = useGetProducts();
  const router = useRouter();
  const setUserData = useUserData((state) => state.setUserData);
  const setUserCart = useCartStore((state) => state.setNewCart);
  const setGlobalLoadingStateForUserFetchingData = useUserData(
    (state) => state.switchLoadingState
  );
  const userData = useUserData((state) => state.user);

  const cartItems = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItemToCart);
  const deleteItemFromArray = useCartStore((state) => state.deleteItemFromCart);
  const { toast } = useToast();

  useEffect(() => {
    let total = 0;
    for (let K in cartItems) {
      total = total + cartItems[K].price;
    }

    setTotalValue(total);
  }, [cartItems.length, addItem, deleteItemFromArray, domLoaded]);

  let format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });

  const formSchema = z.object({
    color: z.string(),
    size: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedItem === null) return;

    const newItem = {
      ...selectedItem,
      selectedColor: values.color,
      size: values.size,
    };

    const findIfItemIsAlreadInCart = cartItems.find((item) => {
      return item.name === selectedItem.name;
    });

    if (findIfItemIsAlreadInCart) {
      const filterCart = cartItems.filter((item) => {
        return item.name !== selectedItem.name;
      });

      const newCart = [...filterCart, newItem];

      setUserCart(newCart);
      toast({
        title: "Item atualizado no seu cart",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } else {
      addItem(newItem);
      toast({
        title: "Item adicionado ao seu cart",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }

    setSelectedItem(null);
    setOpen(false);
  }
  const handleOpenLoginModal = () => {
    setOpenModal(true);
  };

  return (
    <>
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
                    {userData === undefined ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                          
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
                            Adicionar ao carrinho
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className=" text-lg ">
                              Acesse sua conta
                            </DialogTitle>
                            <DialogDescription>
                              Acesse sua com seu email e senha para poder
                              finalizar suas comprinhas! 🎇🎉✨
                            </DialogDescription>
                            <Login />
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button
                        onClick={() => {
                          setCurrentPageIndexToOpenModal(_index);
                          setOpen(true);
                          setSelectedItem({
                            name: item.title,
                            image: item.image[0],
                            price: item.price,
                            id: item.id,
                            quantity: 1,
                            colors: item.colors,
                            selectedColor: null,
                            size: null,
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
                        Adicionar ao carrinho
                      </Button>
                    )}

                    {PageIndexToOpenModal === _index ? (
                      <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogDescription asChild>
                              <div className="w-full h-full  flex justify-between">
                                <div>
                                  <h2 onClick={() => {}}>{item.title}</h2>
                                  <p>{item.description}</p>
                                  <p className="text-2xl my-4 font-bold text-black">
                                    {format.format(item.price)}
                                  </p>
                                  <div className="flex my-5 flex-col">
                                    <Form {...form} key={item.title}>
                                      <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-8"
                                      >
                                        <FormField
                                          control={form.control}
                                          name="color"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>
                                                {" "}
                                                Cores disponíveis
                                              </FormLabel>
                                              <FormControl>
                                                <div className="flex">
                                                  <RadioGroup
                                                    className="w-full"
                                                    defaultValue={undefined}
                                                    onValueChange={
                                                      field.onChange
                                                    }
                                                  >
                                                    <div className="flex items-center space-x-2">
                                                      {item.colors.map(
                                                        (color) => {
                                                          return (
                                                            <div
                                                              style={{
                                                                backgroundColor:
                                                                  color,
                                                              }}
                                                              className="h-5 w-5 flex items-center justify-center px-5 py-5 border"
                                                            >
                                                              {" "}
                                                              <RadioGroupItem
                                                                className="border-none w-10 h-10  rounded-none  text-2xl  "
                                                                value={color}
                                                                id={color}
                                                              />
                                                            </div>
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                  </RadioGroup>
                                                </div>
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={form.control}
                                          name="size"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>
                                                Escolha um tamanho
                                              </FormLabel>
                                              <FormControl>
                                                <Select
                                                  defaultValue={undefined}
                                                  onValueChange={field.onChange}
                                                >
                                                  <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Escolha um tamanho" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    {item.sizes.map((size) => {
                                                      return (
                                                        <SelectItem
                                                          value={size}
                                                        >
                                                          {size}
                                                        </SelectItem>
                                                      );
                                                    })}
                                                  </SelectContent>
                                                </Select>
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />

                                        <Button
                                          type="submit"
                                          onClick={() => {
                                            if (
                                              form.formState.isSubmitSuccessful
                                            ) {
                                              form.resetField("size");
                                              form.resetField("color");
                                            }
                                          }}
                                        >
                                          Adicionar ao carrinho
                                        </Button>
                                      </form>
                                    </Form>

                                    <div className="flex "></div>
                                    <div></div>
                                  </div>
                                </div>
                                <div className="h-1/2 w-full">
                                  <Image
                                    src={item.image[0]}
                                    alt="image"
                                    height={2000}
                                    width={2000}
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : null}
                  </div>
                  <div
                    className="my-2"
                    onClick={() => {
                      router.push(`home/product/${item._id}`);
                    }}
                  >
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
    </>
  );
}

export default ProducsList;
