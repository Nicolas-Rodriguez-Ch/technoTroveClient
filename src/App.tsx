import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import routePaths from "./constants/routePaths";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <main className="App">
      <Header />
      <Routes>
        <Route path={routePaths.notFound} element={<NotFound />} />
        <Route path={routePaths.home} element={<Home />} />
        <Route path={routePaths.profile} element={<Profile />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
