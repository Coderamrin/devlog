import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { getPost, resetPost } from "../../features/post/postSlice";
import BlogLayout from "../../components/Layout/BlogLayout";
import Loading from "../../components/Blog/Loading";

const Post = () => {
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));

    return () => {
      dispatch(resetPost());
    };
  }, [id, dispatch]);

  if (!post) {
    return (
      <>
        <BlogLayout>
          <Loading />
        </BlogLayout>
      </>
    );
  }

  return (
    <>
      <BlogLayout>
        <div className="px-20 post-page">
          <h1 className="py-5">{post.title}</h1>

          <div>
            <img
              className="py-5 w-[100%]"
              src={post.image}
              alt="post thumbnail"
            />
          </div>

          <div className="py-5">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </BlogLayout>
    </>
  );
};

export default Post;
