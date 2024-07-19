import { CgProfile } from 'react-icons/cg';

interface UserPreviewProps {
  profilePicture?: string;
  fullName: string;
  email: string;
  description: string;
}

const UserPreview = ({
  profilePicture,
  fullName,
  email,
  description,
}: UserPreviewProps) => {
  return (
    <main className="flex flex-col md:flex-row justify-center items-start md:items-center text-custom-mint p-4 border-2 border-custom-blue rounded-xl w-[300px] md:w-[650px] transition duration-300 ease-in-out hover:bg-custom-mint hover:text-custom-black">
      <section className="flex justify-center md:mr-3">
        {profilePicture ? (
          <img
            className="rounded-full h-32 w-32 object-cover"
            alt={fullName}
            src={profilePicture}
          />
        ) : (
          <CgProfile size={128} />
        )}
      </section>
      <section className="md:ml-4 space-y-4">
        <section className="md:flex md:gap-4">
          <h1 className="text-2xl text-custom-blue font-bold">{fullName}</h1>
          <h1 className="text-lg opacity-80">{email}</h1>
        </section>
        <p className="text-md opacity-75">{description}</p>
      </section>
    </main>
  );
};

export default UserPreview;
