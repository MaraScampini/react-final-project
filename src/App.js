import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavbarHeader from "./components/Navbar/Navbar";
import Admin from "./containers/Admin/Admin";
import ExerciseDetail from "./containers/ExerciseDetail/ExerciseDetail";
import Exercises from "./containers/Exercises/Exercises";
import Landing from "./containers/Landing/Landing";
import Authentication from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";
import RoutineDetail from "./containers/RoutineDetail/RoutineDetail";
import Routines from "./containers/Routines/Routines";

function App() {
  return (
    <BrowserRouter>
      <NavbarHeader />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Authentication type="login" />} />
        <Route path="/register" element={<Authentication type="register" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/ex_detail" element={<ExerciseDetail />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/r_detail" element={<RoutineDetail />} />
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
