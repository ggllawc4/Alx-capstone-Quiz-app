import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 animate-fade-in">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 hover:scale-110 transition-transform"></div>
    </div>
  );
}

export default LoadingSpinner;