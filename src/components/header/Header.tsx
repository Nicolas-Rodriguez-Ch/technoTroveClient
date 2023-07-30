import { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { isLogged, token } from "../../constants/cookies";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import routePaths from "../../constants/routePaths";
import { banner } from "../../assets/images";
import { User } from "../../store/reducers/users/userInterfaces";
import { logoutUser } from "../../store/reducers/users/userSlice";
import texts from "../../utils/texts";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuClick = () => {
    setShowMenu(!showMenu);
  };

  const logOut = () => {
    Cookies.remove(token);
    dispatch(logoutUser());
    navigate(routePaths.login);
  };

  const user = useSelector((state: RootState) => state.user.data as User);
  const status = useSelector((state: RootState) => state.user.status);
  const linkStyles =
    "block px-4 py-3 text-sm text-custom-mint border-b border-custom-mint hover:bg-custom-mint hover:text-custom-black w-full text-left font-semibold";

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-custom-blue text-custom-mint p-4 flex justify-between items-center">
      <section className="flex flex-col md:flex-row gap-1 md:gap-4 items-center">
        <Link to={routePaths.home}>
          <img
            className="w-[125px] md:w-[150px]"
            src={banner}
            alt="Techno Trove"
          />
        </Link>
      </section>
      <section
        className="relative cursor-pointer"
        onClick={menuClick}
        ref={menuRef}
      >
        {user && user.data && user.data.profilePicture ? (
          <img
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
            src={user.data.profilePicture}
            alt={user.data.fullName}
          />
        ) : (
          user && <CgProfile size={50} />
        )}
        {!user && <GiHamburgerMenu size={50} />}
        <div
          className={`absolute right-0 top-full mt-2 w-64 md:w-72 rounded-md shadow-lg py-2 bg-custom-blue border border-custom-mint ring-opacity-5 transition-transform duration-200 ease-in-out transform origin-top ${
            showMenu ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ transformOrigin: "right top" }}
        >
          <>
            <Link to={routePaths.allUsers} className={linkStyles}>
              {texts.menuAllUsers}
            </Link>
            {isLogged() ? (
              <>
                <Link to={routePaths.profile} className={linkStyles}>
                  {texts.profile}
                </Link>
                <Link to={routePaths.portfolio} className={linkStyles}>
                  {texts.portfolio}
                </Link>
                <button onClick={logOut} className={linkStyles}>
                  {texts.logout}
                </button>
              </>
            ) : (
              <>
                <Link to={routePaths.login} className={linkStyles}>
                  {texts.login}
                </Link>
                <Link to={routePaths.signUp} className={linkStyles}>
                  {texts.signup}
                </Link>
              </>
            )}
          </>
        </div>
      </section>
    </main>
  );
};

export default Header;
