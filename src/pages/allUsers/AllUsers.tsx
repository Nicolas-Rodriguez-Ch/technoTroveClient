import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userAPI";
import UserPreview from "../../components/userPreview/UserPreview";

const AllUsers = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <main className="bg-custom-black p-4 flex flex-col gap-4 items-center">
        <h1>Supp</h1>
        {Object.values(users).map((user: any) => (
          <div key={user}>
            <UserPreview
              fullName={user.fullName}
              email={user.email}
              profilePicture={user.profilePicture}
              description={user.description}
            />
          </div>
        ))}
      </main>
    </>
  );
};

export default AllUsers;
