import React from "react";

function Footer() {
  return (
    <footer className="text-white text-center py-4 mt-3">
      <p className="text-sm">
        Developed by <strong>Grace Lawrence</strong> with OTDB API.{" "}
        <a
          href="https://github.com/ggllawc4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;