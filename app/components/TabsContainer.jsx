"use client";

import { useState, Children, cloneElement } from "react";

export default function TabsContainer({ children, filenames }) {
  const childrenArray = Children.toArray(children);
  const [activeTab, setActiveTab] = useState(0);

  // Use provided filenames or extract from children
  const tabFilenames =
    filenames ||
    childrenArray.map(
      (child) => child.props.filename || child.props["data-filename"],
    );

  return (
    <div className="code-tabs mt-6 mb-4">
      <div className="flex overflow-x-auto border-gray-700">
        {tabFilenames.map((filename, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? "rounded bg-slate-300"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {filename}
          </button>
        ))}
      </div>

      <div>
        {childrenArray.map((child, index) => (
          <div key={index} className={index === activeTab ? "block" : "hidden"}>
            {cloneElement(child)}
          </div>
        ))}
      </div>
    </div>
  );
}
