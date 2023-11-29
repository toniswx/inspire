"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserData } from "@/store/userdata.store";
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
  email: z.string().email({ message: "Email inválido" }),
  password: z.string(),
});

function Login() {
  const router = useRouter();
  const [persistUser, setPersistUser] = React.useState(false);
  const [alert, setAlert] = useState<{ message: null | string }>({
    message: null,
  });
 const userData = useUserData((state) => state.user)



  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    fetch("http://inspire-xlo7.vercel.app/users/login", {
      method: "POST", 
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
        
      },
      redirect: "follow",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        persistUser: persistUser,
      }),
    })
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp);
        if (resp.sucess === true) {
          location.reload()
        } else {
          setAlert({ message: "Email or password does't match,try again." });
        }
      });
  }

  return (
    <div className=" p-2  flex items-center justify-center rounded-xl   flex-col ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2  pt-0  w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    className="w-full"
                    {...field}
                  />
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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="p-1">
            <p className="text-sm text-red-500   ">{alert.message}</p>
          </div>

          <div className="flex justify-center items-center flex-col w-full flex-1 space-y-5">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <div className="flex items-center space-x-2 h-7">
            
              <Separator orientation="vertical" className="" />

              <Button variant={"link"}>Esqueci minha senha</Button>
            </div>
            <Separator />
            <Button
              type="button"
              onClick={() => {
                router.push("/create_account");
              }}
              className="w-full mt-7"
              variant={"outline"}
            >
              Não tenho uma conta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;
