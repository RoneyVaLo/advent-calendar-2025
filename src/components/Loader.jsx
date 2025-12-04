import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#dbcfc1] scale-200">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
