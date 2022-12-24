import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/Layout/DashboardLayout";

import { editPost } from "../../features/post/postSlice";

const EditPost = () => {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, posts } = useSelector((state) => state.post);

  const { id } = useParams();

  const post = posts.find((post) => post._id === id);

  const [state, setState] = useState({
    title: post.title,
    content: post.content,
    image: post.image,
  });

  const { title, content, image } = state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    const toUpdate = {
      title,
      content,
      image,
      id,
    };

    dispatch(editPost(toUpdate));

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

export default EditPost;
