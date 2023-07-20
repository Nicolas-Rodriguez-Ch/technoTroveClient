import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <main className="App">
        <RouterProvider router={router} />
      </main>
    </Provider>
  );
}

export default App;
