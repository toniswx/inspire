"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Badge } from "../badge";
import useGetProductsById from "@/hooks/useGetProductById";
import { useParams } from "next/navigation";
import { Separator } from "../separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCartStore } from "@/store/store";
import { Button } from "../button";
import { Plus, Minus } from "lucide-react";
import { product } from "@/types";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Product() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  let format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });

  const params: {
    id: string;
  } = useParams();

  const data: product | null = useGetProductsById(params.id);

  const cartItems = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItemToCart);
  const deleteItemFromArray = useCartStore((state) => state.deleteItemFromCart);

  const formSchema = z.object({
    color: z.string(),
    size: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newProduct = {
      ...data,
      size: values.size,
      color: values.color,
      quantity: quantity,
    };
    console.log(newProduct);
  }

  const handleSubtractQuantity = () => {
    if (quantity === 1) return;
    setQuantity((oldValue) => oldValue - 1);
  };
  const handleIncreaseQuantity = () => {
    setQuantity((oldValue) => oldValue + 1);
  };

  const handleIndex = (direction: string) => {
    if (direction === "left") {
      if (currentImageIndex - 1 < 0) {
        setCurrentImageIndex(data!.image.length - 1);
      } else {
        setCurrentImageIndex((oldValue) => oldValue - 1);
      }
    }
    if (direction === "right") {
      if (currentImageIndex + 1 === data!.image.length) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex((oldValue) => oldValue + 1);
      }
    }
  };

  if (!data) {
    return <div>Loading..</div>;
  }
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center ">
        <div className="w-10/12 h-full flex items-center justify-between p-4 ">
          <div className="w-1/2 h-full p-2  ">
            <div className="h-4/5 flex items-center justify-center ">
              <div>
                <Button
                  onClick={() => {
                    handleIndex("left");
                  }}
                >
                  <ArrowLeft size={16} strokeWidth={2} />
                </Button>
              </div>
              <div className="flex items-center justify-center flex-col">
                <Image
                  src={data.image[currentImageIndex]}
                  alt="product image"
                  className=" w-10/12 h-full mx-4 object-contain"
                  width={1900}
                  height={1900}
                />
                <div className="flex items-center justify-center ">
                  {data.image.map((item, index) => {
                    return (
                      <>
                        {index === currentImageIndex ? (
                          <div
                            className="w-5 h-5 m-2 rounded-full bg-neutral-900 cursor-pointer"
                            onClick={() => {
                              setCurrentImageIndex(index);
                            }}
                          ></div>
                        ) : (
                          <div
                            className="w-5 h-5 m-2 rounded-full bg-slate-200 cursor-pointer"
                            onClick={() => {
                              setCurrentImageIndex(index);
                            }}
                          ></div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={() => {
                  handleIndex("right");
                }}
              >
                <ArrowRight size={16} strokeWidth={2} />
              </Button>
            </div>
          </div>
          <div className="w-1/3 h-full p-2 mt-50  ">
            <h2 className="text-2xl mb-2 font-semibold space-x-3">
              {data.title}
            </h2>
            <p className="text-xs font-thin">#{data._id}</p>
            <p className="text-xs">{data.description}</p>
            <div className="flex items-center ">
              {" "}
              <p className="text-2xl my-2 font-bold mr-3">
                {format.format(data.price)}
              </p>
              <Badge className="bg-green-400 ">Novo</Badge>
            </div>
            <Separator className="my-4 " />
            <Form {...form} key={data._id}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Cores disponíveis</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <RadioGroup
                            className="w-full"
                            defaultValue={undefined}
                            onValueChange={field.onChange}
                          >
                            <div className="flex items-center space-x-2">
                              {data.colors.map((color) => {
                                return (
                                  <div
                                    style={{
                                      backgroundColor: color,
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
                              })}
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
                      <FormLabel> Escolha um tamanho</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <RadioGroup
                            className="w-full"
                            defaultValue={undefined}
                            onValueChange={field.onChange}
                          >
                            <div className="flex items-center space-x-2">
                              {data.sizes.map((size) => {
                                return (
                                  <div className="h-5 w-5 flex items-center justify-center px-5 py-5 relative ">
                                    <RadioGroupItem
                                      className="  "
                                      value={size}
                                      id={size}
                                    />
                                    <p className="absolute -z-10">{size}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </RadioGroup>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel className="mb-5"> Quantidade</FormLabel>
                  <div className="border h-full  w-fit flex justify-start items-center">
                    <div
                      onClick={() => {
                        handleSubtractQuantity();
                      }}
                      className="px-1 py-1  h-full  bg-neutral-900 cursor-pointer"
                    >
                      <Minus className="text-muted text-sm " />
                    </div>
                    <div className="px-2 py-1 ">
                      <p className="mx-2 text-sm">{quantity}</p>
                    </div>
                    <div
                      className="px-1 py-1 bg-neutral-900 cursor-pointer"
                      onClick={() => {
                        handleIncreaseQuantity();
                      }}
                    >
                      <Plus className="text-muted" />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  type="submit"
                  onClick={() => {
                    if (form.formState.isSubmitSuccessful) {
                      form.resetField("size");
                      form.resetField("color");
                    }
                  }}
                >
                  Adicionar ao carrinho
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
