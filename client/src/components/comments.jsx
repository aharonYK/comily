import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";

const Comments = () => {
  let token = localStorage.getItem("token"); //token from local satorage
  let id;
  if (token) {
    const { _id } = jwt(token);
    id = _id;
  }

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({});

  const handelSubmit = async () => {
    const { data } = await axios.post(
      "http://localhost:3002/api/comments",
      newComment,
      { headers: { "x-auth-token": token } }
    );
    console.log(data);
  };

  async function getData() {
    const { data } = await axios.get("http://localhost:3002/api/comments", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    setComments(data);
  }

  //
  async function getUser() {
    const { data } = await axios.get(`http://localhost:3002/api/users/${id}`);
    console.log(data);
    setNewComment({ name: data.name });
  }
  useEffect(() => {
    getData();
    getUser();
  }, []);

  return (
    <Fragment>
      <div                       //add comment is hidden if there is no token
        hidden={token ? "" : "hidden"}
        style={{ display: "flex",  marginTop: 80 }}
      >
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            handelSubmit();
          }}
        >
          <div className="mb-3">
            <input
              className="form-control"
              onChange={(ev) => {
                setNewComment({ ...newComment, message: ev.target.value });
              }}
              type="text"
              name="message"
              id=""
              placeholder="write here"
            />
          </div>

          <button className="btn btn-info m-2">Add new comment</button>
        </form>
      </div>

      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>name</th>
              <th>comment</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index}>
                <td>{comment.name}</td>
                <td>{comment.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Comments;

