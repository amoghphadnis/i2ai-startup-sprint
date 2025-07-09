// src/pages/Terms/Terms.jsx
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import "./Terms.css";

export default function Terms() {
  const [content, setContent] = useState("<p>Loading…</p>");

  useEffect(() => {
    // If https://i2u.ai allows CORS, you can fetch directly.
    // Otherwise spin up a tiny proxy (e.g. via Netlify Functions or a CORS proxy).
    fetch("https://i2u.ai/TermsNConditions/")
      .then((res) => res.text())
      .then((html) => {
        // parse the full HTML document
        const doc = new DOMParser().parseFromString(html, "text/html");
        // pick the node that wraps your T&C—inspect the live page to find its selector.
        // for example, if they live under <div id="terms-content">…</div>:
        const termsNode = doc.querySelector("#terms-content") 
          || doc.querySelector("main")      // fallback
          || doc.body;
        setContent(termsNode.innerHTML);
      })
      .catch((err) => {
        console.error("Failed to load T&C:", err);
        setContent("<p>Sorry, we couldn’t load the Terms & Conditions right now.</p>");
      });
  }, []);

  return (
    <div className="terms-page container">
      <h1>Terms &amp; Conditions</h1>
      {/* dangerouslySetInnerHTML is safe here because we trust our own server—but sanitize if needed */}
      <div className="terms-content">{parse(content)}</div>
    </div>
  );
}
