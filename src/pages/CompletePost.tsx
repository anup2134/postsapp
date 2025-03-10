import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function CompletePost() {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState<Post>();

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  return (
    <main>
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Post</h1>
          <div className="flex flex-col gap-y-2">
            <h1 className="font-medium text-xl">{post?.title}</h1>
            <p>{post?.body}</p>
            <ul className="flex gap-x-4">
              <li>ID: {post?.id}</li>
              <li>User ID: {post?.userId}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
