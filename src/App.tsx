import { AppDispatch } from './store/store';
import { fetchUser } from './store/reducers/users/userSlice';
import { Route, Routes } from 'react-router-dom';
import { token as tknCookie } from './constants/cookies';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllUsers from './pages/allUsers/AllUsers';
import Cookies from 'js-cookie';
import EditProject from './pages/editProject/EditProject';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NotFound from './pages/NotFound/NotFound';
import Portfolio from './pages/portfolio/Portfolio';
import Profile from './pages/Profile/Profile';
import routePaths from './constants/routePaths';
import SignUp from './pages/signUp/SignUp';

function App() {
  const dispatch: AppDispatch = useDispatch();

  //sets user in the store if token exist
  useEffect(() => {
    const token = Cookies.get(tknCookie);
    if (token) {
      dispatch(fetchUser());
    }
  });

  return (
    <main className="App">
      <Header />
      <Routes>
        <Route path={routePaths.notFound} element={<NotFound />} />
        <Route path={routePaths.home} element={<Home />} />
        <Route path={routePaths.login} element={<Login />} />
        <Route path={routePaths.signUp} element={<SignUp />} />
        <Route path={routePaths.allUsers} element={<AllUsers />} />
        <Route path={routePaths.portfolio} element={<Portfolio />} />
        <Route
          path={`${routePaths.editProject}/:id`}
          element={<EditProject />}
        />
        <Route path={routePaths.profile} element={<Profile />} />
        <Route
          path={`${routePaths.editProject}/:id`}
          element={<EditProject />}
        />
        <Route
          path={`${routePaths.editProject}/:id`}
          element={<EditProject />}
        />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;

