"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
  password_confirm: z.string().min(2),
  name: z.string().min(2),
});

function Page() {
  const [error, setError] = useState<{ message: null | string }>({
    message: null,
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    fetch("https://inspire-xlo7.vercel.app/users", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
      }), // include, *same-origin, omit
      // body data type must match "Content-Type" header
    })
      .then((data) => data.json())
      .then((resp) => {

        if (resp.data.sucess === true) {
          router.push("/userProfile");
        } else {
         setError({message:resp.data.message})
        }
      });
  }

  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-7 w-6/12 p-10 pt-0"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your public name</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{error.message === null ? <p>Email</p> : <p className="text-sm text-red-500  ">{error.message}</p>}</FormLabel>
                  

                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
           
        
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm your password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-10 flex justify-center items-startz flex-col w-full flex-1 space-y-5">
              <Button type="submit" className="mt-10">
                Create account
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default Page;
