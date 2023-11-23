"use client";
import React, { useState } from "react";
import { useUserData } from "@/store/userdata.store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/store/userdata.store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  name_profile: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
});

function page() {
  const user = useUserData((state) => state.user);
  const [currentButtonOptionsIndex, setButtonOptionIndex] = useState(0);
  const options = [
    { name: "Minha conta" },
    { name: "Compras" },
    { name: "Preferencias" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  function centsToReal(cents: number) {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const openInvoicePopUp = (order: Order) => {
    console.log(order);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen p-6">
      <div className="w-full h-5/6 border p-3 lg:w-7/12 ">
        <h2 className="text-lg font-semibold">
          Bem vindo de volta {user?.name}
        </h2>
        <div className="flex  items-center  my-4">
          <div className=" flex flex-col items-start justify-start  w-full ">
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">Conta</TabsTrigger>
                <TabsTrigger value="password">Compras</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="flex items-start flex-col  w-full">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8 w-full p-2"
                    >
                      <FormField
                        control={form.control}
                        name="name_profile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={user?.name}
                                {...field}
                                defaultValue={user?.name}
                              />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={user?.email}
                                {...field}
                                defaultValue={user?.email}
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>{" "}
              </TabsContent>
              <TabsContent value="password">
                <Table className="p-3">
                  <TableCaption>
                    Uma lista das suas compras recentes.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>

                      <TableHead className="text-right">Preço</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user?.invoices.map((item) => {
                      return (
                        <>
                          {" "}
                          <Dialog>
                            <DialogTrigger asChild>
                              <TableRow
                                onClick={() => {
                                  openInvoicePopUp(item);
                                }}
                              >
                                <TableCell className="font-medium">
                                  {item.id}
                                </TableCell>
                                <TableCell>{item.date}</TableCell>

                                <TableCell>
                                  <Badge
                                    className={
                                      item.status === "complete"
                                        ? "bg-green-500"
                                        : "bg-orange-300"
                                    }
                                  >
                                    {item.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  {centsToReal(item.total)}
                                </TableCell>
                              </TableRow>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Recibo</DialogTitle>

                                <DialogDescription>
                                  <p>#{item.id}</p>

                                  <p>Data de compra : {item.date}</p>

                                  <div>
                                    <h2 className="text-lg font-bold text-black mt-4">
                                      Produtos
                                    </h2>

                                    {item.items.map((i) => {
                                      return (
                                        <div className="my-1 border p-2">
                                          <div className="flex flex-col ">
                                            <p className=" text-black">
                                              {i.description}
                                            </p>
                                          </div>
                                          <div className="flex  ">
                                            <h3 className=" text-black font-semibold pr-2">
                                              Quantidade :
                                            </h3>
                                            <p className=" text-black">
                                              {i.quantity}
                                            </p>
                                          </div>
                                          <div className="flex   ">
                                            <h3 className=" text-black font-semibold pr-2">
                                              Moeda :
                                            </h3>
                                            <p className=" text-black">
                                              {i.currency.toUpperCase()}
                                            </p>
                                          </div>
                                          <div className="flex  ">
                                            <h3 className=" text-black font-semibold pr-2">
                                              Total :
                                            </h3>
                                            <p className=" text-black">
                                              {centsToReal(i.amount_total)}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <h2 className="text-lg font-bold text-black mt-4">
                                    Endereço de entrega
                                  </h2>
                                  <div className="my-2">
                                    <p>Nome do endereço : {item.adress.name}</p>
                                    <p>
                                      Endereço : {item.adress.address.line1}
                                    </p>
                                    <p>
                                      Código postal :{" "}
                                      {item.adress.address.postal_code}
                                    </p>

                                    <p>Cidade : {item.adress.address.city}</p>
                                    <p>Estado : {item.adress.address.state}</p>
                                    <p>
                                      País de destino :{" "}
                                      {item.adress.address.country}
                                    </p>
                                  </div>
                                  <h2 className="text-lg font-bold text-black mt-4">
                                    Status da entrega
                                  </h2>
                                  <p>{item.status}</p>
                                  <h2 className="text-lg font-bold text-black mt-4">
                                    Total
                                  </h2>
                                  <p>{centsToReal(item.total)}</p>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
