import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../../features/post/postSlice";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deletePost(post._id));
  }

  return (
    <div className="bg-gray-200 p-2 mb-5">
      <h2 className="text-2xl font-bold capitalize">{post.title}</h2>
      <p className="mb-5">{post.content.substr(1, 150)} ...</p>

      <button className="btn bg-blue-600 hover:bg-blue-800 mr-4">
        Preview
      </button>
      <Link
        to={`/dashboard/edit-post/${post._id}`}
        className=" px-3 py-2 text-white bg-blue-700 hover:bg-blue-900 mr-4"
      >
        Edit
      </Link>
      <button
        className="btn bg-orange-500 hover:bg-orange-700"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PostItem;
