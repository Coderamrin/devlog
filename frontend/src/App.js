import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NewPost from "./pages/Dashboard/NewPost";
import EditPost from "./pages/Dashboard/EditPost";
import EditAuthor from "./pages/Dashboard/NewPost";

import BlogHome from "./pages/Blog/Home";
import Post from "./pages/Blog/Post";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/new" element={<NewPost />} />
        <Route path="/dashboard/edit-post/:id" element={<EditPost />} />
        <Route path="/dashboard/edit-author" element={<EditAuthor />} />

        <Route path="/" element={<BlogHome />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
