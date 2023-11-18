import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "@/app/login";

import { Button } from "./ui/button";

function LoginForm(props: { titleButton: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            changeGlobalIndex === _index
              ? "absolute bottom-2 opacity-100 "
              : "opacity-0 absolute "
          }
        >
          {props.titleButton}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" text-lg ">Acesse sua conta</DialogTitle>
          <DialogDescription>
            Acesse sua com seu email e senha para poder finalizar suas
            comprinhas! 🎇🎉✨
          </DialogDescription>
          <Login />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LoginForm;
