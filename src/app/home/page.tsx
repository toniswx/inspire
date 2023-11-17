"use client";
import { useEffect } from "react";

import { useCartStore } from "../../store/store";

import ProductsList from "@/components/homePageProducts";

import { useUserData } from "@/store/userdata.store";

export default function Home() {
  const setUserData = useUserData((state) => state.setUserData);
  const setUserCart = useCartStore((state) => state.setNewCart);
  const setGlobalLoadingStateForUserFetchingData = useUserData(
    (state) => state.switchLoadingState
  );

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

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className=" 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-2  grid grid-cols-1 items-center justify-center gap-2 mx-8 w-10/12  mt-20">
        <ProductsList />
      </div>
    </div>
  );
}
