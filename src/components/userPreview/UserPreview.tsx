interface userPreviewProps {
  profilePicture?: string;
  fullName: string;
  email: string;
  desctiption: string;
}

const UserPreview = ({
  profilePicture,
  fullName,
  email,
  desctiption,
}: userPreviewProps) => {
  return (
    <>
      <main className="flex flex-col md:flex-row border-custom-mint">
        <section>
          <img alt={fullName} src={profilePicture} />
        </section>
        <section>
          <h1>{fullName}</h1>
          <h1>{email}</h1>
          <p>{desctiption}</p>
        </section>
      </main>
    </>
  );
};

export default UserPreview;
