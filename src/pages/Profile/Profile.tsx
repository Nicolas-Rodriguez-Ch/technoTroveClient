import React, {useState} from 'react';
import { BsPencil } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const { data: user } = useSelector((state: RootState) => state.user);
  console.log("🚀 ~ file: Profile.tsx:9 ~ Profile ~ user:", user)

  const toggleEditHandler = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <div className=" flex-col">
      <main className="userCard "></main>
        <button onClick={toggleEditHandler}>
        <BsPencil />
        </button>
      <div className=" profile-picture">
        <img src="https://media.licdn.com/dms/image/D4E35AQGOnZnHdpVbIw/profile-framedphoto-shrink_200_200/0/1689688389433?e=1691017200&v=beta&t=SyrDtf6jcWMv0B8CBDv-Omvk5QmyaMrAcKXwYChcFkE" alt="user image" />

      </div>
    </div>
  );
}

export default Profile;
