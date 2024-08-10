import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import Chat from "./pages/Chat";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Header from "./components/Header";
import ProtectedRoute from "./utilits/ProtectedRoute";

function App() {
  const { isLoading }: any = useAuth0();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Chats />
        </ProtectedRoute>
      ),
    },
    {
      path: ":robotId",
      element: (
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      ),
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
