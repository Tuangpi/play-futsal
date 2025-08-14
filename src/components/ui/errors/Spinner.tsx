import React from "react";

const Spinner: React.FC = () => (
  <div className="relative w-10 h-10">
    <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
    <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-20 animate-pulse"></div>
  </div>
);

export default Spinner;
