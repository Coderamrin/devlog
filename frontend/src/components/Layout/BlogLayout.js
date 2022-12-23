import React from "react";

import Header from "./Blog/Header";
import Footer from "./Blog/Footer";

const BlogLayout = ({ children }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Header />
          <div className="md:pl-60 pl-8">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BlogLayout;
