import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${
        page * limit
      }&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        // console.log(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4 flex-wrap">
          <h1 className="text-2xl font-bold">Posts</h1>
          <Link
            className="px-2 py-2 bg-blue-500 text-white rounded cursor-pointer block"
            to="/create/post"
          >
            Create Post
          </Link>
        </div>
        <ul className="flex flex-col gap-y-4">
          {loading ? (
            <div className="flex justify-center items-end w-[300px] h-[100px] space-x-2 mx-auto">
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.1s]"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.2s]"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.3s]"></div>
            </div>
          ) : (
            posts.map((post) => (
              <Link
                to={`/post/${post.id}`}
                key={post.id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition block"
              >
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-600 line-clamp-2 overflow-hidden text-ellipsis">
                  {post.body}
                </p>
              </Link>
            ))
          )}
        </ul>
        <div className="flex justify-between mt-6 flex-wrap">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={() => setPage(page + 1)}
            disabled={posts.length < limit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
