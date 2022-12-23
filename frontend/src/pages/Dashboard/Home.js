import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from "../../features/post/postSlice";

import DashboardLayout from "../../components/Layout/DashboardLayout";
import PostItem from "../../components/Dashboard/PostItem";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.post);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getPosts());
  }, [dispatch, navigate, user]); 

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold mb-5">Posts</h1>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <>
        <h1 className="text-3xl font-bold mb-5">Posts</h1>
         
        {posts.length > 0 ? (
          <>
            {posts.map((post, i) => (
              <PostItem key={i} post={post} />
            ))}
          </>
        ) : (
          <div>
            <p className="mb-5">No postst available. Please add posts..</p>
            <Link
              to="/dashboard/new"
              className="btn bg-blue-700 hover:bg-blue-900"
            >
              New Post
            </Link>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export default Home;
