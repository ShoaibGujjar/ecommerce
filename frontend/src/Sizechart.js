import React from "react";
import { Route } from "react-router-dom";
function Sizechart() {
  return (
      <form action="">
          <div>
              <label htmlfor ="Chest">Chest</label>
              <input type="text" name="Chest" id="Chest"></input>
          </div>
          <div>
              <label htmlfor ="Shoulder">Shoulder</label>
              <input type="text" name="Shoulder" id="Shoulder"></input>
          </div>
          <div>
              <label htmlfor ="Neck">Neck</label>
              <input type="text" name="Neck" id="Neck"></input>
          </div>
          <div>
              <label htmlfor ="Waist">Waist</label>
              <input type="text" name="Waist" id="Waist"></input>
          </div>
          <div>
              <label htmlfor ="username">username</label>
              <input type="text" name="username" id="username"></input>
          </div>
      </form>
  )
} 

export default Sizechart