import React from "react";
import { FiUser } from "react-icons/fi";

function UserInfo({ user }) {
  return (
    <div className="flex flex-col gap-8 text-sm sm:text-base">
      <main className="">
        <div className="profile-picture">
          {user && user.data.img ? (
            <img
              src={user.data.img}
              alt={user.data.fullName}
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <FiUser className="w-32 h-32 rounded-full object-cover" />
          )}
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-4xl font-bold mb-2">
            {user ? user.data.fullName : "Loading..."}
          </h1>
          <span className="block mb-2">
            {user ? user.data.email : "Loading..."}
          </span>
          <p className="user-description mb-4">
            {user ? user.data.description : "Loading..."}
          </p>
        </div>
        <div className="contact-info">
          {user ? (
            user.data.contactInfo.map((item:string, index:number) => (
              <div key={index} className="mb-4">
                <p>{item}</p>
              </div>
            ))
          ) : (
            "Loading..."
          )}
        </div>
      </main>
    </div>
  );
}

export default UserInfo;
