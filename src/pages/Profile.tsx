import { useState } from "react";
import { HiOutlineSave, HiOutlineUpload } from "react-icons/hi";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
  WhiteButton,
} from "../components";

const Profile = () => {
  const [inputObject, setInputObject] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="flex h-auto border-t border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="w-full dark:bg-blackPrimary bg-whiteSecondary">
        <div className="py-10 dark:bg-blackPrimary bg-whiteSecondary">
          <div className="flex items-center justify-between px-4 pb-8 border-b border-gray-800 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Your Profile
              </h2>
            </div>
            {/* Profile update button or any other action */}
            <WhiteButton
              link="/profile"
              textSize="lg"
              width="48"
              py="2"
              text="Update profile"
            >
              <HiOutlineSave className="text-xl dark:text-blackPrimary text-whiteSecondary" />
            </WhiteButton>
          </div>
          <div className="px-4 pt-8 pb-8 sm:px-6 lg:px-8">
            {/* Profile details section */}
            <div className="flex flex-col gap-4">
              {/* Example: Displaying user information */}
              <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-10">
                <div className="flex items-center gap-4">
                  <img
                    src="/src/assets/profile.jpg"
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <p className="text-xl dark:text-whiteSecondary text-blackPrimary">
                      Sherwood Gruninger
                    </p>
                    <p className="dark:text-whiteSecondary text-blackPrimary">
                      Web Developer
                    </p>
                  </div>
                </div>

                <button className="flex items-center justify-center py-2 text-lg duration-200 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary w-72 dark:hover:border-gray-500 hover:border-gray-400 gap-x-2">
                  <HiOutlineUpload className="text-xl dark:text-whiteSecondary text-blackPrimary" />
                  <span className="font-medium dark:text-whiteSecondary text-blackPrimary">
                    Change profile picture
                  </span>
                </button>
              </div>
              {/* Additional sections like password change, email update, etc. */}
              <div className="flex flex-col gap-3 mt-5">
                <InputWithLabel label="Your username">
                  <SimpleInput
                    type="text"
                    placeholder="Your username"
                    value={inputObject.username}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        username: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Your email">
                  <SimpleInput
                    type="text"
                    placeholder="Your email"
                    value={inputObject.email}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, email: e.target.value })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="New password">
                  <SimpleInput
                    type="password"
                    placeholder="Enter your new password..."
                    value={inputObject.password}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        password: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Confirm new password">
                  <SimpleInput
                    type="password"
                    placeholder="Confirm your new password..."
                    value={inputObject.confirmPassword}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
              </div>
            </div>
          </div>
          {/* Notifications section, already implemented in the provided code */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
