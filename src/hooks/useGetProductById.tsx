import React, { useState } from "react";
import { product } from "@/types";
export default function useGetProductsById(id: string) {
  const [result, setResult] = useState<product | null>(null);
  React.useEffect(() => {
    async function fetchProductsListById() {
      try {
        const response = await fetch(`http://localhost:3030/products/${id}`, {
          method: "GET",
        });

        const json = await response.json();
        // console.log(json);
        setResult(json.data);
      } catch (error) {}
    }
    fetchProductsListById();
  }, []);

  return result;
}
