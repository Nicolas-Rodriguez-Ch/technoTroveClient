import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userAPI";
import {UserPreview} from "../../components/userPreview/userPreview"

const AllUsers = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUsers();
      console.log(data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Supp</h1>
      {Object.values(users).map((user: any) => (
        <div key={user}>
          <UserPreview />
        </div>
        ))}
    </>
  );
};

export default AllUsers;
