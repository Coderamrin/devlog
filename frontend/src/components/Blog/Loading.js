import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="spinner-container">
      <div className="spinner text-center h-screen flex justify-center items-center mx-auto">
        <FaSpinner size={50} />
      </div>
    </div>
  );
};

export default Loading;
