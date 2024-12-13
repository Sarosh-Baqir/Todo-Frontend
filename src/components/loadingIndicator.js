import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-16 h-16 border-8 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingIndicator;
