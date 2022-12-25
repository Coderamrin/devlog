import React from "react";

import { AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-gray-800 px-5 py-4 flex justify-between text-white">
      <p>
        Developed with love by{" "}
        <a href="https://twitter.com/CoderAmrin">Amrin</a>
      </p>

      <p>&copy; 2023 CoderAmrin all right reserved</p>

      <div className="flex">
        <a
          className="hover:text-blue-800"
          href="https://twitter.com/CoderAmrin"
        >
          <AiOutlineTwitter size={30} />
        </a>
        <a
          className="hover:text-blue-800"
          href="https://twitter.com/CoderAmrin"
        >
          <AiOutlineYoutube size={30} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
