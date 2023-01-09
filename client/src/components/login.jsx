import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({});
  const handelSubmit = async () => {
    console.log(data);
    const resulte = await axios.post("http://localhost:3002/api/login", data);
    console.log(resulte);
    console.log(resulte.data);

    localStorage.setItem("token", resulte.data);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handelSubmit();
      }}
    >
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          email
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(ev) => setData({ ...data, email: ev.target.value })}
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          onChange={(ev) => setData({ ...data, password: ev.target.value })}
        />
      </div>

      <button type="submit" class="btn btn-success">
        sign In
      </button>
    </form>
  );
};

export default Login;
