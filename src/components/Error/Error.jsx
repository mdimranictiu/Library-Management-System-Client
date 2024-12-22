import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex items-center justify-center h-screen">
        <p className="text-3xl text-center">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
};

export default Error;
