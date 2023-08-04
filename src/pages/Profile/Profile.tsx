//Profile.tsx
import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import { BsPencil } from "react-icons/bs";
import UserInfo from '../../components/UserInfo/UserInfo'
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm';


const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: user } = useSelector((state: RootState) => state.user);

  const toggleEditHandler = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  const submitUserUpdate = ()=> {
    // send information to store and database.
  }

  return (
    <>
      <ToastContainer />
      <main className="flex flex-col items-center bg-custom-black text-custom-mint p-4 gap-1 ">
        {isEditMode?
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
  )
}

export default Profile
