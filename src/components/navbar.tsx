"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CarFront, ShoppingCart } from "lucide-react";
import { useUserData } from "@/store/userdata.store";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useCartStore } from "../store/store";
import Login from "@/app/login";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userDataType } from "@/store/userdata.store";
import { cartItem } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Suspense } from "react";
import { LogIn } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Bodys",
    href: "",
    description: "",
  },
  {
    title: "Academia",
    href: "",
    description: "",
  },
  {
    title: "Leggins",
    href: "",
    description: "",
  },
  {
    title: "Parte de cima",
    href: "",
    description: "",
  },
];

export default function Navbar() {
  //work-around but try to solve this
  const [domLoaded, setDomLoaded] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [getUserSession, setUserSession] = useState(false);
  const route = useRouter();
  let format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });
  const userData = useUserData((state) => state.user);
  const loadingStatusForDataFetchinUserData = useUserData(
    (state) => state.isLoading
  );
  const cartItems = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItemToCart);
  const deleteItemFromArray = useCartStore((state) => state.deleteItemFromCart);
  const setNewCart = useCartStore((state) => state.setNewCart);

  useEffect(() => {
    let total = 0;
    for (let K in cartItems) {
      total = total + cartItems[K].price;
    }

    setTotalValue(total);
    setDomLoaded(true);
  }, [cartItems.length, addItem, deleteItemFromArray]);

  useEffect(() => {
    if (userData === undefined) return;
    fetch("http://localhost:3030/update/usercart", {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email: userData.email, cart: cartItems }),
    });
  }, [cartItems.length]);

  const deleteItemFromCart = (itemToDelete: cartItem) => {
    const filteredArray = cartItems.filter((item) => {
      return item.name !== itemToDelete.name;
    });
    if (filteredArray) {
      deleteItemFromArray(filteredArray);
    } else {
    }
  };

  const setNewSize = (oldItem: cartItem, newSize: string) => {
    const newCart = cartItems;
    
    const newItem = { ...oldItem, size: newSize };
    const index = newCart.findIndex((item) => item.name == oldItem.name);
    // Make sure the index is found, than replace it
    if (index > -1) {
      newCart.splice(index, 1, newItem);
      setNewCart(newCart);

      
    }
  };

  return (
    <div className="w-full flex justify-around items-center h-20  border-b shadow-sm ">
      <svg
        width="190"
        height="180"
        viewBox="0 0 453 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M137.127 114.678V104.472H143.347V66.1164H137.127V55.9097H161.687V66.1164H155.467L155.308 104.472H161.687V114.678H137.127Z"
          fill="black"
        />
        <path
          d="M167.285 114.678V72.9741H179.565V79.5128L186.821 72.9741H201.414L210.265 81.905V114.678H197.985V84.058L194.955 80.9481H188.655L179.565 89.3209V114.678H167.285Z"
          fill="black"
        />
        <path
          d="M217.193 114.678V105.588H239.36L242.072 102.877V100.724L239.121 97.6936H223.333L215.04 89.7993V80.8684L223.253 73.0539H249.966V82.0645H229.552L227.08 84.6959V86.211L229.951 89.1614H245.899L254.192 96.976V106.784L245.979 114.678H217.193Z"
          fill="black"
        />
        <path
          d="M259.37 125.634V72.1952H271.65V77.6973L277.551 72.1154H292.542L301.393 81.0463V104.968L292.542 113.82H277.63L271.65 108.318V125.634H259.37ZM279.305 105.846H286.641L289.352 103.055V82.9601L286.641 80.0895L279.305 80.1692L271.65 87.3458V98.669L279.305 105.846Z"
          fill="black"
        />
        <path
          d="M307.563 68.4289V57.9032H319.843V68.4289H307.563ZM307.563 114.678V72.9741H319.843V114.678H307.563Z"
          fill="black"
        />
        <path
          d="M327.015 114.678V72.9741H339.295V79.9115L346.551 73.0539H355.403V84.5365H344.717L339.295 89.7196V114.678H327.015Z"
          fill="black"
        />
        <path
          d="M367.964 114.678L359.113 105.827V81.905L367.964 73.0539H389.175L398.106 81.905V97.5341H371.393V102.319L374.582 105.508L397.388 105.428V114.678H367.964ZM371.313 89.4804H386.464V84.058L383.274 80.8684L374.582 80.9481L371.313 84.058V89.4804Z"
          fill="black"
        />
        <path
          d="M101.259 61.5817H94.6318V54.019H114.169V73.556H106.606V66.9298L59.853 113.683L54.5054 108.335L101.259 61.5817Z"
          fill="black"
        />
        <path
          d="M59.4922 58.2777L54.1445 63.6253L73.2417 82.7225L78.5893 77.3749L59.4922 58.2777Z"
          fill="black"
        />
        <path
          d="M85.4649 94.9456L90.8125 89.598L106.606 105.392V98.7649H114.169V118.302H94.6318V110.739H101.258L85.4649 94.9456Z"
          fill="black"
        />
      </svg>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="border">
              Categorias
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px]  ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant={"outline"}
                  className="px-6"
                  disabled={domLoaded ? false : true}
                >
                  {domLoaded && <ShoppingCart className="mr-2 h-4 w-4" />}{" "}
                  {domLoaded ? (
                    cartItems.length
                  ) : (
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="">
                <SheetHeader>
                  <SheetTitle>Seu carrinho de compras</SheetTitle>
                </SheetHeader>
                {
                  <Suspense fallback={<p>Loading..</p>}>
                    <div className="flex flex-col  h-full">
                      <ScrollArea className=" h-5/6 px-3">
                        <div className=" ">
                          {domLoaded ? (
                            cartItems.map((item: cartItem) => {
                              return (
                                <>
                                  <div className="h-36 w-full mt-8  flex justify-between  rounded-md ">
                                    <div className="flex flex-col justify-between w-10/12 pr-4">
                                      <div>
                                        <p className=" h-fit text-xs line-clamp-2">
                                          {item.name}
                                        </p>
                                       

                                        <div className="flex items-center justify-start my-3">
                                          {item.sizes.map((size) => {
                                            return (
                                              <div
                                               
                                                 className="mr-2 font-mono"
                                                onClick={() => {
                                                  setNewSize(item, size);
                                                }}
                                              >
                                                {size === item.size ? (
                                                  <div className="text-xs border border-neutral-200 bg-zinc-200   rounded-3xl cursor-pointer">
                                                    <p className="text-xs px-3 p-1 text-muted-foreground">
                                                      {size}
                                                    </p>
                                                  </div>
                                                ) : (
                                                  <div className="text-xs border rounded-3xl cursor-pointer">
                                                    <p className="text-xs px-3 p-1 text-muted-foreground">
                                                      {size}
                                                    </p>
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                        <div className="flex ">
                                          {item.selectedColor === null ? (
                                            <a className="text-xs my-2 border-b cursor-pointer ">
                                              {" "}
                                              Selecione uma cor
                                            </a>
                                          ) : (
                                            <div className="flex items-center justify-between w-full my-1">
                                              <h2 className="text-xs">Cor</h2>
                                              <div
                                                className="w-5 h-5 opacity-70"
                                                style={{
                                                  backgroundColor:
                                                    item.selectedColor,
                                                }}
                                              ></div>
                                            </div>
                                          )}
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
                                            <line
                                              x1="10"
                                              x2="10"
                                              y1="11"
                                              y2="17"
                                            />
                                            <line
                                              x1="14"
                                              x2="14"
                                              y1="11"
                                              y2="17"
                                            />
                                          </svg>
                                        </Button>
                                      </div>
                                    </div>

                                    <Image
                                      draggable
                                      src={item.image}
                                      width={1000}
                                      height={400}
                                      alt={item.name}
                                      className=" w-28 h-full object-cover  transition-all"
                                      unoptimized
                                    />
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <p> No items in the cart </p>
                          )}
                        </div>
                      </ScrollArea>

                      <Separator />
                      <div className="px-2 my-6">
                        <h2>Total : {format.format(totalValue)} </h2>
                        <Button className="w-full my-4">
                          Finalizar compra
                        </Button>
                      </div>
                    </div>
                  </Suspense>
                }
              </SheetContent>
            </Sheet>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            {domLoaded && (
              <div>
                {userData === undefined ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className=" mx-5">Login</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className=" text-lg ">
                          Acesse sua conta
                        </DialogTitle>
                        <DialogDescription>
                          Acesse sua com seu email e senha para poder finalizar
                          suas comprinhas! 🎇🎉✨
                        </DialogDescription>
                        <Login />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{userData.name}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => {
                            route.push("/userProfile");
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Compras</span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Configurações</span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          <span>Novo carrinho</span>
                          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
