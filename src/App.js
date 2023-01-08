import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavbarHeader from "./components/Navbar/Navbar";
import Exercises from "./containers/Exercises/Exercises";
import Landing from "./containers/Landing/Landing";
import Authentication from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <NavbarHeader />
      <Routes>
        <Route path ="/" element={<Landing/>}/>
        <Route path="/login" element={<Authentication type="login" />} />
        <Route path="/register" element={<Authentication type="register" />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/exercises" element={<Exercises/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
