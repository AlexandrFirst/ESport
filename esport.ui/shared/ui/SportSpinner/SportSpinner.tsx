import React from "react";

export const SportSpinner: React.FC = () => {
  return (
    <div
      className="
    spinner-border
    animate-spin
    inline-block
    w-8
    h-8
    border-4
    rounded-full
    text-purple-500
  "
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
