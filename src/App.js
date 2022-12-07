import FirstHeader from "./components/FirstHeader";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import Wallet from "./components/Wallet";
import ViewDetails from "./components/ViewDetails";
import Intro from "./components/Intro";
import Admin from "./components/Admin";
import EditItem from "./components/EditItem";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/oops-project" element={<Intro />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Edit" element={<EditItem />} />
          <Route path="/" element={<Intro />} />
          <Route path="/Details" element={<ViewDetails />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Details" element={<ViewDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Wallet" element={<Wallet />} />
          <Route path="/Login" element={<FirstHeader />}>
            <Route path="" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
