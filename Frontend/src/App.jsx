import {Router, Routes, Route} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import {Navigate} from  "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  )
}

export default App;
