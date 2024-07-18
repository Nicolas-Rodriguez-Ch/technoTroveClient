import { isLogged } from '../../constants/cookies';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import routePaths from '../../constants/routePaths';
import texts from '../../utils/texts';

const DropdownMenu = ({
  logOut,
  linkStyles,
}: {
  logOut: () => void;
  linkStyles: string;
}) => {
  return (
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
  );
};
const MemoizedDropdownMenuComponent = memo(DropdownMenu);

export default MemoizedDropdownMenuComponent;
