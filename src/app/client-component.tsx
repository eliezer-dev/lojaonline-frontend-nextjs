'use client'
import { useData } from "@/context/DataContext";
import { useEffect, useState } from "react";

export default function RootComponent ({
    children,
  }: {
    children: React.ReactNode;
  }) {
     const {isCartActive} = useData();
    

    useEffect(() => {
        if (isCartActive) {
          document.body.classList.add("no-scroll");
        } else {
          document.body.classList.remove("no-scroll");
        }
      }, [isCartActive]);


    return (
        <>
           {isCartActive && <div className="overlay"></div>}
           {children}
        </>
    )

}    