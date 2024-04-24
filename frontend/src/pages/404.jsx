import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      404 - Page not found
      <div>
        Go back <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
