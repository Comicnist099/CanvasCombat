import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $, { get } from "jquery";

export function DashBoardCharacter() {
  return (
    <>
      <div
        className="col-11 center"
        style={{ marginTop: "30px", marginLeft: "50px" }}
      >
        <div className="row">
          <div className="one">
            <h1 style={{ color: "white" }}>Personajes</h1>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6 col-md-3 col-lg-2">
          <div class="card p-1 mb-3 text-center mw-100 mh-100 clearfix">
            <div >
                

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
