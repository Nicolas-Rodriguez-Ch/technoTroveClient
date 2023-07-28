import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { banner } from "../../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import routePaths from "../../constants/routePaths";
import { User } from "../../store/reducers/users/userInterfaces";
import { isLogged } from "../../constants/cookies";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const menuClick = () => {
    setShowMenu(!showMenu);
  };

  const logOut = () => {
    navigate(routePaths.login);
  };

  const user = useSelector((state: RootState) => state.user.data as User);
  const linkStyles =
    "block px-4 py-3 text-sm text-custom-mint border-b border-custom-mint hover:bg-custom-mint hover:text-custom-black w-full text-left font-semibold";
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
      <section className="relative" onClick={menuClick}>
        {user ? (
          user.profilePicture ? (
            <img src={user.profilePicture} alt={user.fullName} />
          ) : (
            <CgProfile size={50} />
          )
        ) : (
          <GiHamburgerMenu size={50} />
        )}
        <div
          className={`absolute right-0 top-full mt-2 w-64 md:w-72 rounded-md shadow-lg py-2 bg-custom-blue border border-custom-mint ring-opacity-5 transition-transform duration-200 ease-in-out transform origin-top ${
            showMenu ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ transformOrigin: "right top" }}
        >
          {isLogged() ? (
            <>
              <Link to={routePaths.profile} className={linkStyles}>
                Profile
              </Link>
              <Link to={routePaths.portfolio} className={linkStyles}>
                Portfolio
              </Link>
              <button onClick={logOut} className={linkStyles}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={routePaths.allUsers} className={linkStyles}>
                Look for a user
              </Link>
              <Link to={routePaths.login} className={linkStyles}>
                Login
              </Link>
              <Link to={routePaths.signUp} className={linkStyles}>
                Signup
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Header;
