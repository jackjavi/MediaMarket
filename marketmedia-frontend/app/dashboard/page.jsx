"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Post from "../(home)/components/post";
import { FaEdit } from "react-icons/fa";
import Profile from "./components/Profile";
import NavBar from "../creators/components/Navbar";
import Footer from "../(home)/components/Footer copy";
import ProductCategories from "../(home)/components/ProductCategories";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const Settings = () => {
  const [coverFile, setCoverFile] = React.useState([]);
  const [profileFile, setProfileFile] = React.useState([]);
  const [about, setAbout] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [user, setUser] = React.useState(null);
  //const [updatedUser, setUpdatedUser] = React.useEffect(null);
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    setUser(user);
  }, []);

  const sendProducts = () => {
    let myUpdatedUser = {};

    const coverfileUrl = JSON.parse(localStorage.getItem("coverfileUrl"));
    if (coverfileUrl && coverfileUrl.length > 0) {
      myUpdatedUser.coverImage = coverfileUrl[0];
      localStorage.removeItem("coverfileUrl");
    }
    const profilefileUrl = JSON.parse(localStorage.getItem("profilefileUrl"));
    if (profilefileUrl && profilefileUrl.length > 0) {
      myUpdatedUser.profileImage = profilefileUrl[0];
      localStorage.removeItem("profilefileUrl");
    }
    if (username) {
      myUpdatedUser.username = username;
    }
    if (email) {
      myUpdatedUser.email = email;
    }
    if (about) {
      myUpdatedUser.about = about;
    }

    // Send the completeProductWithUrls to the backend
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    axios
      .patch(
        `http://localhost:8000/api/v1/auth/update/${userId}`,
        myUpdatedUser,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((response) => {
        // Handle the response from the backend
        console.log("User updated successfully:", response.data);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoading(false);
        setEdit(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error updating user:", error);
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      // Append coverimage
      if (coverFile && coverFile.length > 0) {
        coverFile.forEach((file) => {
          formData.append("files", file);
        });
        const coverfileResponse = await axios.post(
          "http://localhost:8000/api/v1/upload/image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (coverfileResponse.data) {
          const coverurl = coverfileResponse.data.map((file) => file.url); // Extract the URLs from the response data
          // Store imageUrls in localStorage
          localStorage.setItem("coverfileUrl", JSON.stringify(coverurl));

          formData.delete("files");
        }
      }

      // Append profileimage
      if (profileFile && profileFile.length > 0) {
        profileFile.forEach((file) => {
          formData.append("files", file);
        });
        const profilefileResponse = await axios.post(
          "http://localhost:8000/api/v1/upload/image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (profilefileResponse.data) {
          const profileurl = profilefileResponse.data.map((file) => file.url); // Extract the URLs from the response data
          // Store imageUrls in localStorage
          localStorage.setItem("profilefileUrl", JSON.stringify(profileurl));

          formData.delete("files");
        }
      }

      sendProducts();
    } catch (err) {
      console.log(err.data);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="container mx-auto">
      <NavBar />
      <section className=" h-full">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setEdit((prev) => !prev)}
        >
          <FaEdit />
          <span className="font-bold">Edit</span>
        </div>

        <div className="md:flex md:gap-4">
          <div className="flex-[8]">
            {!edit && <Profile />}
            {edit && (
              <div className="h-screen mb-40">
                <div className="flex  gap-4 w-full m-auto">
                  <form onSubmit={handleSubmit} className="flex-[9]">
                    <p className="flex items-center justify-between">
                      <span className="text-xl mb-4 font-bold text-purple-400 cursor-pointer">
                        Update Your Account
                      </span>
                      <span className="text-[red] font-bold text-[12px] cursor-pointer">
                        Delete Your Account
                      </span>
                    </p>
                    <div className="flex items-center my-[10px] h-[40vh] w-full">
                      {coverFile && coverFile.length > 0 ? (
                        coverFile.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt=""
                            height={70}
                            width={70}
                            className="object-cover rounded-md h-full w-full object-top"
                          />
                        ))
                      ) : (
                        // Render a placeholder if coverFile is empty
                        <div className="w-full h-full flex flex-col items-center justify-center text-[whitesmoke] bg-blue-500 rounded-md">
                          <div className="">
                            <label
                              htmlFor="cover"
                              className="cursor-pointer font-bold text-lg font-lora"
                            >
                              Click here to add Cover Image
                            </label>
                            <input
                              type="file"
                              onChange={(e) =>
                                setCoverFile([...e.target.files])
                              }
                              id="cover"
                              className="hidden "
                              multiple
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-[25px] h-[25px] text-blue-500">
                      <label htmlFor="profile">
                        {/*<AccountCircleIcon />*/}
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setProfileFile([...e.target.files])}
                        id="profile"
                        className="hidden"
                      />
                    </div>
                    <div className="flex items-center my-[10px]">
                      {profileFile.length > 0 ? (
                        profileFile.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt=""
                            height={70}
                            width={70}
                            className="object-cover rounded-full h-[70px] w-[70px]"
                          />
                        ))
                      ) : (
                        // Render a placeholder if profileFile is empty
                        <div className=" text-purple-400 ">
                          <label htmlFor="profile">
                            <FaUserCircle size={50} />
                          </label>
                          <input
                            type="file"
                            onChange={(e) =>
                              setProfileFile([...e.target.files])
                            }
                            id="profile"
                            className="hidden"
                            multiple
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className=" flex flex-col max-w-[70%]">
                        <label className="text-[teal] font-bold">
                          username
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                          className="rounded-md outline-purple-400 mt-2 text-blue-400 p-2 text-lg lg:text-xl"
                        />
                        <label className="mt-4 text-[teal] font-bold">
                          email
                        </label>
                        <input
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="rounded-md outline-purple-400 mt-2 text-blue-400 p-2 text-lg lg:text-xl"
                        />
                        <label className="mt-4 text-[teal] font-bold">
                          password
                        </label>
                        <input
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          className="rounded-md outline-purple-400 mt-2 text-blue-400 p-2 text-lg lg:text-xl"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[teal] font-bold">About</label>
                        <textarea
                          onChange={(e) => setAbout(e.target.value)}
                          cols={10}
                          rows={5}
                          className="rounded-md outline-purple-400 mt-2 text-blue-400 p-2 text-lg lg:text-xl"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="w-[150px] rounded-md p-1 mt-8 text-white bg-[teal] font-bold"
                        >
                          {loading ? "uploading..." : "update"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/*<Post />*/}
          </div>
          <div className="">
            <ProductCategories />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Settings;
