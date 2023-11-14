"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { userAgent } from "next/server";
import { boolean } from "zod";
import { useUserData } from "@/store/userdata.store";
type User = {
  name: string;
  email: string;
  user_picture: string;
};
type Load = boolean;

function Page() {
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<User | Load>(false);
  const router = useRouter();
  const setCurrentUser = useUserData((state) => state.setUserData);

  useEffect(() => {
    fetch("http://localhost:3030/users", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include",
      headers: {
        "Content-Type": "Authorization",
      }, // include, *same-origin, omit
      // body data type must match "Content-Type" header
    })
      .then((data) => data.json())
      .then((resp) => {
        if (resp.sucess === true) {
          setLoader(true);
          setUserData(resp.data);
        } else {
          router.push("/");
        }
      });
  }, []);

  const logout = () => {
    fetch("http://localhost:3030/logout", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((data) => data.json())
      .then((resp) => {
        if (resp.data === true) {
          localStorage.clear();
          setCurrentUser(undefined);
          router.push("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {loader === false ? (
        <div>Loading...</div>
      ) : (
        <div>
          {typeof userData === "boolean" ? "Loading" : userData.name}
          <Button
            onClick={() => {
              logout();
            }}
          >
            Log out
          </Button>
        </div>
      )}
    </>
  );
}

export default Page;
