import React from "react";
import "../../../app/globals.css";

function Spinner() {
  return (
    <div className='w-full h-screen grid place-items-center'>
      <div className='loader'></div>
    </div>
  );
}

export default Spinner;
