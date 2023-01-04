import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavbarHeader from "./components/Navbar/Navbar";
import Authentication from "./containers/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <NavbarHeader />
      <Routes>
        <Route path="/login" element={<Authentication type="login" />} />
        <Route path="/register" element={<Authentication type="register" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
