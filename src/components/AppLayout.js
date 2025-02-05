import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Login from "./Login";
import Browse from "./Browse";
import Error from "./Error";
const AppLayout = () => {
  const appRouter = createBrowserRouter(
    [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
    ],
    {
      errorElement: <Error />,
    }
  );

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default AppLayout;
