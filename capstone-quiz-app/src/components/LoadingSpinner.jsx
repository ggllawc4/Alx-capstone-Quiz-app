import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;