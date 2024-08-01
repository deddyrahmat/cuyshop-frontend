import { RouterProvider } from "react-router-dom";
import { router } from "./route/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
