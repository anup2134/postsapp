import { useState } from "react";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posted, setPosted] = useState<boolean>(false);
  const [falied, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (title.trim().length === 0) return;
    if (description.trim().length > 1000) return;
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    })
      .then(async (res) => (await res.json()) as { id: number })
      .catch((err) => console.log(err));
    setLoading(false);
    if (!response) {
      setPosted(false);
      setFailed(true);
    } else {
      setPosted(true);
      setTimeout(() => {
        navigate("/posts");
      }, 1000);
    }
  };

  return (
    <main>
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          {loading && (
            <div className="flex justify-center items-end w-[300px] h-[100px] space-x-2 mx-auto">
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.1s]"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.2s]"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.3s]"></div>
            </div>
          )}

          {!loading && !posted && (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">
                Create Post
              </h1>
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
                    title.trim().length === 0 ||
                    description.trim().length > 1000
                  }
                >
                  Create Post
                </button>
              </form>
              {falied && (
                <h1 className="text-2xl font-bold text-center mt-2">
                  Falied to post, try again.
                </h1>
              )}
            </>
          )}
          {posted && (
            <h1 className="text-2xl font-bold text-center mb-6">
              Post created successfully.
            </h1>
          )}
        </div>
      </div>
    </main>
  );
}
