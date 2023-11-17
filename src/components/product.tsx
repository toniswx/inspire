"use client";
import React from "react";
import { product } from "@/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Product() {
  const [product, setProducts] = useState<product | null>(null);


  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");

    const items = [
      {
        id: 1,
        title: "Blusa Cropped com Fio Metalizado e Argola na Lateral Off White",
        price: 99.76,
        description: "",
        category: "Roupas Femininas",
        colors: ["#FFF"],
        sizes: ["S", "M", "G"],
        image: [
          "https://img.lojasrenner.com.br/item/879703574/large/3.jpg",
          "https://img.lojasrenner.com.br/item/879703574/large/4.jpg",
        ],
        rating: {
          rate: 5,
          count: 0,
        },
      },
      {
        id: 2,
        title: "Blusa Cropped Básica sem Manga em Algodão com Gola Alta Roxo",
        price: 30.76,
        description: "",
        category: "Roupas Femininas",
        colors: ["#235dfc", "#be29e3"],
        sizes: ["S", "M", "G"],

        image: [
          "https://img.lojasrenner.com.br/item/853251338/large/3.jpg",
          "https://img.lojasrenner.com.br/item/853251338/large/4.jpg",
        ],
        rating: {
          rate: 5,
          count: 0,
        },
      },
    ];

    const foundItem = items.find((item) => {
      return item.id === parseInt(id!);
    });
	  const x = JSON.stringify(foundItem);
	  console.log(x)
    const parse = JSON.parse(x);

    setProducts(parse);
  }, []);

  return <div>{product !== null ? product.title : ""}</div>;
}

export default Product;
