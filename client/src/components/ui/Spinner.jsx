import React from "react";

const Spinner = () => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="inline-block w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin" />
  </div>
);

export default Spinner;