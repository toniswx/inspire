"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { product } from "@/types";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { useCartStore } from "../../store/store";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import ProductsList from "@/components/homePageProducts";
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

////

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";

////

import { useRouter } from "next/navigation";

export default function Home() {
  const { toast } = useToast();
  const [products, setProducts] = useState<product[] | null>(null);
  const [curretIndex, setCurrentIndex] = useState(0);
  const [mouseIsActive, setMouseActive] = useState(false);
  const [PageIndexToOpenModal, setCurrentPageIndexToOpenModal] = useState<
    number | undefined
  >(undefined);

  const [changeGlobalIndex, setChangeGlobalIndex] = useState<null | number>(
    null
  );
  const [open, setOpen] = useState(false);

  //work-around but try to solve this
  const [domLoaded, setDomLoaded] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState<cartItem | null>(null);

  useEffect(() => {
    fetch("http://localhost:3030/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }, // include, *same-origin, omit
      // body data type must match "Content-Type" header
    })
      .then((data) => data.json())
      .then((resp) => {
        setProducts(resp);
      })
      .catch((err) => {
        if (err) {
        }
      });
  }, []);

  let format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });

  const router = useRouter();
  const setUserData = useUserData((state) => state.setUserData);
  const setUserCart = useCartStore((state) => state.setNewCart);
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
          setUserCart(resp.data.cart);
          setGlobalLoadingStateForUserFetchingData(false);
        } else if (resp.sucess === false) {
          setGlobalLoadingStateForUserFetchingData(false);
          setUserCart([]);
          setUserData(undefined);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  }, []);

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

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className=" 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-2  grid grid-cols-1 items-center justify-center gap-2 mx-8 w-10/12  mt-20">
        
        <ProductsList />
      </div>
    </div>
  );
}
