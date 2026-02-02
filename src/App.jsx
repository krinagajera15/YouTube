import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Router";
import { ModeContextProvider } from "./Context/ModeContext";


function App() {
  return (
 
    <RouterProvider router={router} />
  
  );
}
export default App;
