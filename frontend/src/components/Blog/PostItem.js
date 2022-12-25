import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div className="flex items-center post-item pb-5 mb-16 h-[166px] ">
      <div className="max-w-[450px]">
        <img
          src={post.image}
          alt="post thumbnail"
          className=" object-contain w-[100%] h-[100%]"
        />
      </div>
      <div className="px-5  flex flex-col">
        <h2 className="text-3xl mb-2 text-bold">{post.title}</h2>
        <p className="mb-2">{post.content.substr(0, 100)} ...</p>
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
