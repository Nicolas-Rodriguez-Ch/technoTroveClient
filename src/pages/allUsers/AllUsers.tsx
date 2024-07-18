import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/userAPI';
import UserPreview from '../../components/userPreview/UserPreview';
import { Link } from 'react-router-dom';
interface User {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  description: string;
}

const AllUsers = () => {
  const [users, setUsers] = useState<Record<string, User>>({});
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
        {Object.values(users).map((user) => (
          <Link key={user.id} to={`user/${user.id}`}>
            <UserPreview
              fullName={user.fullName}
              email={user.email}
              profilePicture={user.profilePicture}
              description={user.description}
            />
          </Link>
        ))}
      </main>
    </>
  );
};

export default AllUsers;
