import React from "react";
import { Route, Routes } from "react-router-dom";
import Comments from "./comments";
import Login from "./login";
import Register from "./register";

const Main = () => {
  return (
    <Routes>
      <Route path="/comments" element={<Comments />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Main;
