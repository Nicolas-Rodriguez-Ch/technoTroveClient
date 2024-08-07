import { CgProfile } from 'react-icons/cg';
import { memo } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const ProfilePicture = () => {
  const profilePicture = useSelector(
    (state: RootState) => state.user.data?.data?.profilePicture
  );
  const fullName = useSelector(
    (state: RootState) => state.user.data?.data?.fullName
  );

  return profilePicture ? (
    <img
      className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
      src={profilePicture}
      alt={fullName}
    />
  ) : (
    <CgProfile size={50} />
  );
};

const MemoizedProfilePictureComponent = memo(ProfilePicture);
export default MemoizedProfilePictureComponent;

