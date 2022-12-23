import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Layout/DashboardLayout";

import { addPost } from "../../features/post/postSlice";

const NewPost = () => {
  const [state, setState] = useState({
    title: "",
    content: "",
    image: "",
  });

  const { title, content, image } = state;
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  function handleSubmit(e) {
    e.preventDefault();

    const post = {
      title,
      content,
      image
    };

    dispatch(addPost(post));

    if (isSuccess) {
      navigate("/dashboard");
    }
  }

  return (
    <DashboardLayout>
      <>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="title"
            placeholder="add title"
            value={title}
            required
            onChange={(e) =>
              setState({ ...state, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            name="image"
            placeholder="add image"
            value={image}
            required
            onChange={(e) =>
              setState({ ...state, [e.target.name]: e.target.value })
            }
          />

          <textarea
            name="content"
            id=""
            cols="30"
            rows="10"
            value={content}
            required
            placeholder="Add contnet"
            onChange={(e) =>
              setState({ ...state, [e.target.name]: e.target.value })
            }
            className="h-screen"
          ></textarea>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </>
    </DashboardLayout>
  );
};

export default NewPost;
