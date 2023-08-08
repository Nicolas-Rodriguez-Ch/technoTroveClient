//Profile.tsx
import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import { BsPencil } from "react-icons/bs";
import UserInfo from '../../components/UserInfo/UserInfo'
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm';
import { useDispatch } from 'react-redux';
import userSlice, { updateUser } from '../../store/reducers/users/userSlice';

const Profile = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: user } = useSelector((state: RootState) => state.user);
  console.log("user in profile.tsx:", user)

  const toggleEditHandler = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  const submitUserUpdate = (data:any)=> {
    try {
      const contactInfoArray = data.contactInfo.map((item: { field: string }) => item.field);
      const formattedData = {
        ...data,
        contactInfo: contactInfoArray,
      };
      dispatch(updateUser(formattedData))
      toast.success("user updated successfully.")
      setIsEditMode(false)
      } catch (error) {
      if(error instanceof Error){
        toast.error(`Error: ${error.message} `)
      }
    }
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
ofile.tsx to format the contactInfo data properly:
        <button className=''
          onClick={toggleEditHandler}>
          <BsPencil />
        </button>

      </main>
    </>
  )
}

export default Profile
