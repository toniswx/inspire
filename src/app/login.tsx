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
import User from "../../public/user.png";
import Image from "next/image";
import { useEffect } from "react";
import { redirect } from "next/navigation";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

function Login() {
  const router = useRouter();
  const [alert, setAlert] = useState<{ message: null | string }>({
    message: null,
  });

  useEffect(() => {
    console.log("oi");
    fetch("http://localhost:3030/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include",
      headers: {
        "Content-Type": "Authorization",
      }, // include, *same-origin, omit
      // body data type must match "Content-Type" header
    })
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp);
        if (resp.sucess === true) {
          router.push("/userProfile");
        } else if (resp.sucess === false) {
          router.push("/");
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    fetch("http://localhost:3030/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify({ email: values.email, password: values.password }), // body data type must match "Content-Type" header
    })
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp)
        if (resp.sucess === true) {
          router.push("/userProfile");
        } else {
          setAlert({ message: "Email or password does't match,try again." });
        }
      });
  }

  return (
    <div className="w-6/12 flex items-center justify-center rounded-xl  p-2 m-3 flex-col">
      <div className="space-y-10 w-8/12 p-10 flex items-center justify-center flex-col">
        <Image src={User} width={200} height={300} alt="Icon" />
        <p className="text-sm font-semibold grayscale-0">
          Welcome back ! Sing in to access your account.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-8/12 p-10 pt-0"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
          <div className="p-3">
            <p className="text-sm text-red-500   ">{alert.message}</p>
          </div>
          <div className="flex justify-center items-center flex-col w-full flex-1 space-y-5">
            <Button type="submit" className="w-full">
              Sing in
            </Button>

            <Separator />
            <Button
              type="button"
              onClick={() => {
                router.push("/create_account");
              }}
              className="w-full mt-7"
              variant={"outline"}
            >
              Sing up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;
