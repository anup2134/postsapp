import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import CompletePost from "./pages/CompletePost";

const router = createBrowserRouter([
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/create/post",
    element: <CreatePost />,
  },
  {
    path: "/post/:id",
    element: <CompletePost />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
