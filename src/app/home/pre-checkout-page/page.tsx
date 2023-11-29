"use client";
import React from "react";
import { useUserData } from "@/store/userdata.store";
import { useCartStore } from "@/store/store";
import Items from "@/components/cart-items/item";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function page() {
  let format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });
  const total = useCartStore((state) => state.total);
  const cartItem = useCartStore((state) => state.cart);
  const route = useRouter();
  const user = useUserData((state) => state.user);
  const handleCheckout = async () => {
    try {
      const data = await fetch("https://inspire-xlo7.vercel.app/checkout", {
        method: "POST",
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // Outros cabeçalhos necessários
        },
        body: JSON.stringify({ cart: cartItem, user: user!.email }),
      });
      const resp = await data.json();
      route.push(resp.url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-start justify-around w-full flex-col lg:flex-row  p-4 ">
      <div
        className=" mx-2  flex items-center justify-normal 
	  "
      >
        <Items />
      </div>
      <div className="w-full lg:w-1/3 h-full flex items-center justify-normal  flex-col">
        <div className="w-full grid grid-cols-3 my-5 "></div>
        <div className="w-full p-10 bg-neutral-900 text-white ">
          <h2 className="text-3xl font-bold">Resumo</h2>
          <div className="flex items-center justify-between my-4 ">
            <p className="text-xs">Subtotal :</p>
            <p className="text-xs">{format.format(total)}</p>
          </div>
          <div className="flex items-center justify-between  my-4">
            <p className="text-xs">Descontos :</p>
            <p className="text-xs">--</p>
          </div>
          <div className="flex items-center justify-between  my-4">
            <p className="text-xs">Valor estimado do frete :</p>
            <p className="text-xs">--</p>
          </div>
          <div className="flex items-center justify-between my-5">
            <p className="text-lg">Total :</p>
            <p className="text-lg">{format.format(total)}</p>
          </div>
          <Button
            className="w-full bg-white text-black"
            variant={"outline"}
            onClick={handleCheckout}
          >
            Ir para pagamento
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
