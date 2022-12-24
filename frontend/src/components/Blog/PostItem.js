import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div className="flex post-item pb-5 ">
      <div className="">
        <img
          src={post.image}
          alt="post thumbnail"
          className=" object-cover w-[400px] h-[200px]"
        />
      </div>
      <div className="px-5 py-4 flex flex-col">
        <h2 className="text-3xl mb-2">{post.title}</h2>
        <p className="mb-2">{post.content.substr(1, 100)} ...</p>
        <div className="mt-auto">
          <Link to={`/post/${post._id}`} className="btn submit-btn">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
