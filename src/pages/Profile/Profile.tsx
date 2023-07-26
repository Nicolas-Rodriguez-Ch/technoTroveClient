import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    description: "",
    contactInfo: ["", "", "", "", ""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <main className="Profile">
      <div className="profile-picture">profile picture</div>
      <div class="md:col-span-5">
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.full_name}
          onChange={handleChange}
        />
      </div>

      <div class="md:col-span-5">
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          id="email"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@domain.com"
        />
      </div>

      <div class="md:col-span-5">
        <label htmlFor="description">Your Description</label>
        <input
          type="text"
          name="description"
          id="description"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description in no more than 500 characters."
        />
      </div>

      <div className="md:col-span-5">
        <label htmlFor="contactInfo">Contact Info</label>
        <input
          type="text"
          name="contactInfo"
          id="contactInfo"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.contactInfo}
          onChange={handleChange}
          placeholder="First"
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};

export default Profile;
