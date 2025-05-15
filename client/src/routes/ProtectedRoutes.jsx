import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  if (!auth) {
    return navigate("/login");
  }
  return children;
};

export default ProtectedRoutes;
