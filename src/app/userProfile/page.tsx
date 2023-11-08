"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Page() {
  const [loader, setLoader] = useState(false);

  const router = useRouter();

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
        console.log(resp);
        if (resp.sucess === true) {
          setLoader(true);
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
          router.push("/");
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
          <h2> User data here</h2>
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
