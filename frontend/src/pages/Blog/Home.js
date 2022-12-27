import React, { useEffect } from "react";
import BlogLayout from "../../components/Layout/BlogLayout";
import PostItem from "../../components/Blog/PostItem";
import Loading from "../../components/Blog/Loading";

import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../features/post/postSlice";


const BlogHome = () => {
  const { posts, loading } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPosts());
    }
  }, [dispatch, posts.length]);

  if (loading) {
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
        <div className=" pt-20 pb-10 max-w-[75%]">
          {posts.length > 0
            ? posts.map((post) => <PostItem post={post} key={post._id} />)
            : "No posts available"}
        </div>
      </BlogLayout>
    </>
  );
};

export default BlogHome;
