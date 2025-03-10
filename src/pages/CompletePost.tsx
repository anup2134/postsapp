import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Post } from "../types";

export default function CompletePost() {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res): Promise<Post> => res.json())
      .then((res) => {
        setPost({
          title: res.title,
          body: res.body,
          id: res.id,
          userId: res.userId,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setFailed(true);
      });
  }, [postId]);

  return (
    <main>
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          {loading ? (
            <div className="flex justify-center items-end w-[300px] h-[100px] space-x-2 mx-auto">
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.1s]"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.2s]"></div>
              <div className="w-5 h-2 bg-blue-500 rounded-md animate-loading-wave [animation-delay:0.3s]"></div>
            </div>
          ) : failed ? (
            <h1 className="text-2xl font-bold">Failed to load the post</h1>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">Post</h1>
              <div className="flex flex-col gap-y-2">
                <h1 className="font-medium text-xl">{post?.title}</h1>
                <p>{post?.body}</p>
                <ul className="flex gap-x-4">
                  <li>ID: {post?.id}</li>
                  <li>User ID: {post?.userId}</li>
                </ul>
              </div>
              <Link
                className="px-3 py-2 bg-blue-500 text-white rounded cursor-pointer block w-max m-auto disabled:bg-gray-300"
                to="/posts"
              >
                Back
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
