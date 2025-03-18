import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/poppins";
import "@fontsource/sarabun";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LoginOrSignup from "./Pages/Auth/LoginOrSignup";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOrSignup />} />
        <Route path="/login" element={<LoginOrSignup />} /> {/* Add this route */}
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
