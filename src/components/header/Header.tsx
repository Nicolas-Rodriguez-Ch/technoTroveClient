import { AppDispatch } from '../../store/store';
import { banner } from '../../assets/images';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/reducers/users/userSlice';
import { token } from '../../constants/cookies';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import MemoizedDropdownMenuComponent from '../DropdownMenuComponent/DropdownMenuComponent';
import MemoizedProfilePictureComponent from '../ProfilePicture/ProfilePicture';
import routePaths from '../../constants/routePaths';

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const linkStyles =
    'block px-4 py-3 text-sm text-custom-mint border-b border-custom-mint hover:bg-custom-mint hover:text-custom-black w-full text-left font-semibold';

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
        <div className="hidden md:block">
          <MemoizedProfilePictureComponent />
        </div>
        <div className="block md:hidden">
          <GiHamburgerMenu size={50} />
        </div>
        <div
          className={`absolute right-0 top-full mt-2 w-64 md:w-72 rounded-md shadow-lg py-2 bg-custom-blue border border-custom-mint ring-opacity-5 transition-transform duration-200 ease-in-out transform origin-top ${
            showMenu ? 'scale-y-100' : 'scale-y-0'
          }`}
          style={{ transformOrigin: 'right top' }}
        >
          <MemoizedDropdownMenuComponent
            logOut={logOut}
            linkStyles={linkStyles}
          />
        </div>
      </section>
    </main>
  );
};

export default Header;
