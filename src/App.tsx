import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import routePaths from "./constants/routePaths";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import Cookies from "js-cookie";
import {token as tknCookie } from "./constants/cookies"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/reducers/users/userSlice";
import { AppDispatch } from "./store/store";
import Profile from "./pages/Profile/Profile"
import AllUsers from "./pages/allUsers/AllUsers";


function App() {
  const dispatch: AppDispatch = useDispatch()

//sets user in the store if token exist
  useEffect(()=> {
    const token = Cookies.get(tknCookie)
    if(token){
      dispatch(fetchUser())
    }
  })

  return (
    <main className="App">
      <Header />
      <Routes>
        <Route path={routePaths.notFound} element={<NotFound />} />
        <Route path={routePaths.home} element={<Home />} />
        <Route path={routePaths.login} element={<Login />} />
        <Route path={routePaths.signUp} element={<SignUp />} />
        <Route path={routePaths.profile} element={<Profile />} />
        <Route path={routePaths.allUsers} element={<AllUsers />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
