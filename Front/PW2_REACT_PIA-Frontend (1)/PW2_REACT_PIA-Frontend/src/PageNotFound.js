import React from "react";
import { Route, Link, Routes } from "react-router-dom";

export function PageNotFound() {
  return (
    <div class="container text-center">
      <h1 style={{ color: "white" }}>Esta Pagina no existe</h1>
      <img
        style={{
          width: 500,
          maxHeight: 800,
        }}
        alt=" "
        src="https://stories.freepiklabs.com/storage/26838/oops-404-error-with-a-broken-robot-pana-2854.png"
      ></img>
    </div>
  );
}
