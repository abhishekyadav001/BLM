import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layouts/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar /> */}
      <AppRoutes />
    </>
  );
}

export default App;
