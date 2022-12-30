import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";

function App() {
  return (
    
    <div data-theme="light" className="max-w-screen-xl mx-auto">
       <RouterProvider router={router } />  
   </div>
    
  );
}

export default App;
