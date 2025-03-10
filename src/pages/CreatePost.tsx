import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (title.trim().length === 0) return;
    if (description.trim().length > 1000) return;

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Create Post</h1>
          <form className="flex flex-col">
            <label className="font-medium text-lg">Post Title:</label>
            <input
              value={title}
              className="border border-gray-400 rounded-sm py-1 px-2 mb-4"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label className="font-medium text-lg">Post Description:</label>
            <textarea
              className="border border-gray-400 rounded-sm mb-4 w-full h-48 p-2"
              maxLength={1000}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button
              className="px-2 py-2 bg-blue-500 text-white rounded cursor-pointer block w-32 m-auto disabled:bg-gray-300"
              onClick={handleSubmit}
              disabled={
                title.trim().length === 0 || description.trim().length > 1000
              }
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
