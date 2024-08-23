"use client";
import React from "react";
import Navigation from "../navbar/navbar";

export default function print() {
  return (
    <>
      <div className="flex">
        <Navigation/>
        <main className="w-mx-auto">
            <h1 className="text-[20px]">Print</h1>
        </main>
      </div>
    </>
  );
};
