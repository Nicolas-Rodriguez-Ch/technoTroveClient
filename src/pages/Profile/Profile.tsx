import { AppDispatch, RootState } from '../../store/store';
import { BsPencil } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import { updateUser } from '../../store/reducers/users/userSlice';
import { useDispatch ,useSelector } from 'react-redux';
import { User } from '../../store/reducers/users/userInterfaces';
import { useState } from 'react';
import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm';
import UserInfo from '../../components/UserInfo/UserInfo';

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: user } = useSelector((state: RootState) => state.user as unknown as User);

  const toggleEditHandler = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  const submitUserUpdate = async (data:any)=> {
    try {
      const contactInfoArray = data.contactInfo.map((item: { field: string }) => item.field);
      const formattedData = {
        ...data,
        contactInfo: contactInfoArray,
      };
      dispatch(updateUser(formattedData));
      const response = await dispatch(updateUser(data));
      if(response){
        toast.success('user updated successfully.');
        setIsEditMode(false);}
      } catch (error) {
      if(error instanceof Error){
        toast.error(`Error: ${error.message} `);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="flex flex-col items-center bg-custom-black text-custom-mint p-4 gap-1 ">
        {isEditMode && user?
          ( <UpdateUserForm  submitUserUpdate={submitUserUpdate} user={user}/> )
          :
          ( <UserInfo user={user}/> )
        }
        <button className=''
          onClick={toggleEditHandler}>
          <BsPencil />
        </button>

      </main>
    </>
  );
};

export default Profile;
