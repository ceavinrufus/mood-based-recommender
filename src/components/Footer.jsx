import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white flex h-40 items-center justify-between p-10">
      <div className="space-y-4">
        <h2 className="text-2xl px-4">
          Moods<span className="font-bold">Diary</span>
        </h2>
        <div className="">
          <a
            href="/"
            className="hover:underline px-4 py-2 rounded-md transition duration-300 ease-in-out"
          >
            Home
          </a>
          <a
            href="/recommender"
            className="hover:underline px-4 py-2 rounded-md transition duration-300 ease-in-out"
          >
            Recommender
          </a>
        </div>
      </div>
      <div className="px-4">
        {/* GitHub logo with link */}
        <a href="https://github.com/ceavinrufus" target="blank" className="">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
        {/* Copyright notice */}
        <p>© 2023 Ceavin Rufus</p>
      </div>
    </footer>
  );
};

export default Footer;
