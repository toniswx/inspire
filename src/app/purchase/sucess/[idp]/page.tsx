"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function page() {
  const route = useRouter();
  const params: {
    idp: string;
  } = useParams();

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div>
        <div className="flex items-center justify-center  p-2  ">
          <svg
            width="280"
            height="120"
            viewBox="0 0 453 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M137.127 114.678V104.472H143.347V66.1164H137.127V55.9097H161.687V66.1164H155.467L155.308 104.472H161.687V114.678H137.127Z"
              fill="black"
            />
            <path
              d="M167.285 114.678V72.9741H179.565V79.5128L186.821 72.9741H201.414L210.265 81.905V114.678H197.985V84.058L194.955 80.9481H188.655L179.565 89.3209V114.678H167.285Z"
              fill="black"
            />
            <path
              d="M217.193 114.678V105.588H239.36L242.072 102.877V100.724L239.121 97.6936H223.333L215.04 89.7993V80.8684L223.253 73.0539H249.966V82.0645H229.552L227.08 84.6959V86.211L229.951 89.1614H245.899L254.192 96.976V106.784L245.979 114.678H217.193Z"
              fill="black"
            />
            <path
              d="M259.37 125.634V72.1952H271.65V77.6973L277.551 72.1154H292.542L301.393 81.0463V104.968L292.542 113.82H277.63L271.65 108.318V125.634H259.37ZM279.305 105.846H286.641L289.352 103.055V82.9601L286.641 80.0895L279.305 80.1692L271.65 87.3458V98.669L279.305 105.846Z"
              fill="black"
            />
            <path
              d="M307.563 68.4289V57.9032H319.843V68.4289H307.563ZM307.563 114.678V72.9741H319.843V114.678H307.563Z"
              fill="black"
            />
            <path
              d="M327.015 114.678V72.9741H339.295V79.9115L346.551 73.0539H355.403V84.5365H344.717L339.295 89.7196V114.678H327.015Z"
              fill="black"
            />
            <path
              d="M367.964 114.678L359.113 105.827V81.905L367.964 73.0539H389.175L398.106 81.905V97.5341H371.393V102.319L374.582 105.508L397.388 105.428V114.678H367.964ZM371.313 89.4804H386.464V84.058L383.274 80.8684L374.582 80.9481L371.313 84.058V89.4804Z"
              fill="black"
            />
            <path
              d="M101.259 61.5817H94.6318V54.019H114.169V73.556H106.606V66.9298L59.853 113.683L54.5054 108.335L101.259 61.5817Z"
              fill="black"
            />
            <path
              d="M59.4922 58.2777L54.1445 63.6253L73.2417 82.7225L78.5893 77.3749L59.4922 58.2777Z"
              fill="black"
            />
            <path
              d="M85.4649 94.9456L90.8125 89.598L106.606 105.392V98.7649H114.169V118.302H94.6318V110.739H101.258L85.4649 94.9456Z"
              fill="black"
            />
          </svg>
        </div>
        <h2 className="my-4 font-bold">Obrigado pela sua compra!</h2>
        <p className="text-muted-foreground text-sm">
          Seu número de pedido é : #{params.idp}{" "}
        </p>
        <div>
          <p className="text-muted-foreground text-sm">
            Você vai receber um recibo do pedido no seu email
          </p>
        </div>
        <div className="w-full flex items-center justify-center space-y-9 my-3">
          {" "}
          <Button
            className="w-full bg-emerald-500"
            onClick={() => {
              route.push("/home");
            }}
          >
            Continuar comprando
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
