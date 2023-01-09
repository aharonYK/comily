import React, { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [newUser, setNewUser] = useState({});
  const navigator = useNavigate()
  const handelSubmit = async () => {
    
    const { data } = await axios.post(
      "http://localhost:3002/api/users",
      newUser
    );
    console.log(data);
    setNewUser({});
    navigator('/comments')
  };

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handelSubmit();
        }}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(ev) => setNewUser({ ...newUser, name: ev.target.value })}
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            email
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(ev) =>
              setNewUser({ ...newUser, email: ev.target.value })
            }
          />
          <span id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </span>
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(ev) =>
              setNewUser({ ...newUser, password: ev.target.value })
            }
          />
        </div>

        <button type="submit" class="btn btn-success">
          sign In
        </button>
      </form>
    </Fragment>
  );
};

export default Register;
