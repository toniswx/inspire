"use client";
import Navbar from "../../components/navbar";

import { useEffect } from "react";

import { useCartStore } from "../../store/store";

import ProductsList from "@/components/homePageProducts";

import { useUserData } from "@/store/userdata.store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const setUserData = useUserData((state) => state.setUserData);
  const setUserCart = useCartStore((state) => state.setNewCart);
  const handleCartState = useCartStore((state) => state.handleCartState);
  const setGlobalLoadingStateForUserFetchingData = useUserData(
    (state) => state.switchLoadingState
  );

  useEffect(() => {
    fetch("http://inspire-xlo7.vercel.app:3030/users/login", {
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
          console.log(resp.data)
          setUserData(resp.data);
          setUserCart(resp.data.cart);
          handleCartState(false);
          setGlobalLoadingStateForUserFetchingData(false);
        } else if (resp.sucess === false) {
          setGlobalLoadingStateForUserFetchingData(false);
          handleCartState(false);
          setUserCart([]);
          setUserData(undefined);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
