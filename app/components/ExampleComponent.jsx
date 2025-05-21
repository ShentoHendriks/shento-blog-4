"use client";

export default function ExampleComponent({ title }) {
  return (
    <div className="p-4 bg-blue-100 rounded-md border border-blue-200 my-5">
      <p>Hello this is a component!</p>
      <p>This is your title: {title}</p>
      <a
        onClick={() => console.log("hello!")}
        className="cursor-pointer">
        Click me!
      </a>
    </div>
  );
}
