import React from "react";

import Header from "./Blog/Header";
import Footer from "./Blog/Footer";

const BlogLayout = ({ children }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Header />
          <div className="container mx-auto">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BlogLayout;
