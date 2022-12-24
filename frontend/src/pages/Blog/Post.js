import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getPost } from "../../features/post/postSlice";
import BlogLayout from "../../components/Layout/BlogLayout";

const Post = () => {
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  if (!post) {
    return (
      <>
        <BlogLayout>Loading ...</BlogLayout>
      </>
    );
  }

  return (
    <>
      <BlogLayout>
        <h1>{post.title}</h1>

        <div>
          <img src={post.image} alt="post thumbnail" />
        </div>

        <p>
            {post.content}
        </p>
      </BlogLayout>
    </>
  );
};

export default Post;
