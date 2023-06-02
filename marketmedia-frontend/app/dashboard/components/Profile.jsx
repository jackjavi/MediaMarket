"use client";

import React from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
const ProfilePage = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://your-api.com/user/your-user-id"
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-[whitesmoke] rounded-md text-blue-500">
      <div className="w-full h-[40vh] text-[whitesmoke]">
        {user && user.coverImage ? (
          <img
            src={user.coverImage}
            alt="Cover Image"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-blue-500 rounded-t-md w-full h-full flex items-center justify-center">
            <span>Cover Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="">
          {user && user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile Picture"
              className="rounded-full w-40 h-40 object-cover"
            />
          ) : (
            <FaUserCircle size={50} />
          )}
        </div>
        <div className="mt-2">
          <div>
            {user && <h1 className="text-2xl font-bold">{user.name}</h1>}
            {!user && (
              <h1 className="text-2xl font-bold">Jack Javi [placeholder]</h1>
            )}
          </div>

          {user && <p> user.description</p>}
          {!user && (
            <div className="py-4">
              <h3 className="font-bold text-xl">About</h3>
              <p className="font-lora leading-6 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sit
                eum necessitatibus, accusamus, nostrum vel saepe odit error,
                neque exercitationem a quas quidem similique autem ea placeat
                voluptatum quasi ex. Quaerat ducimus quisquam doloremque ad,
                porro esse voluptates adipisci quia pariatur modi vero quae et
                laboriosam nam voluptate aliquid impedit!
              </p>
            </div>
          )}
          {/* Add other user information fields */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
