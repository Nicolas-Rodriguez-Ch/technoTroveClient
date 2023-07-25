import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import routePaths from "./constants/routePaths";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";

function App() {
  return (
    <main className="App">
      <Header />
      <Routes>
        <Route path={routePaths.notFound} element={<NotFound />} />
        <Route path={routePaths.home} element={<Home />} />
        <Route path={routePaths.login} element={<Login />} />
        <Route path={routePaths.signUp} element={<SignUp />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
