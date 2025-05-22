"use client";

import { useRef, useState } from "react";

export default function CodeBlock({ children, className, ...props }) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Extract filename from props
  const filename = props.filename || props["data-filename"];

  const copyToClipboard = () => {
    if (!preRef.current) return;
    const code = preRef.current.querySelector("code")?.textContent || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block relative overflow-hidden rounded-lg">
      {filename && (
        <div className="code-filename bg-gray-800 px-3 py-1 font-mono text-sm text-gray-300">
          {filename}
        </div>
      )}

      <div className="relative">
        <pre ref={preRef} className={className} {...props}>
          {children}
        </pre>

        <button
          onClick={copyToClipboard}
          className="copy-button absolute top-2 right-2 rounded bg-gray-700/50 p-1.5 text-xs text-gray-300 transition-all hover:bg-gray-700"
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
