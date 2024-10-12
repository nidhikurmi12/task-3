import "./App.css";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={< Register/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
