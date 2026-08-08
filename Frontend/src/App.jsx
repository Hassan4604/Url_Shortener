import {Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import {Navigate} from  "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } />

      </Routes>
    </>
  )
}

export default App;
