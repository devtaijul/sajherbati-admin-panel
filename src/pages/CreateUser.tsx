import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineSave } from "react-icons/hi";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
  WhiteButton,
} from "../components";
import SelectInput from "../components/SelectInput";
import { roles } from "../utils/data";

const CreateUser = () => {
  return (
    <div className="flex h-auto border-t border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="w-full dark:bg-blackPrimary bg-whiteSecondary ">
        <div className="py-10 dark:bg-blackPrimary bg-whiteSecondary">
          <div className="flex items-center justify-between px-4 pb-8 border-b border-gray-800 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Add new user
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button className="flex items-center justify-center w-48 py-2 text-lg duration-200 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary dark:hover:border-gray-500 hover:border-gray-400 gap-x-2">
                <AiOutlineSave className="text-xl dark:text-whiteSecondary text-blackPrimary" />
                <span className="font-medium dark:text-whiteSecondary text-blackPrimary">
                  Save draft
                </span>
              </button>
              <WhiteButton
                link="/users/create-user"
                textSize="lg"
                width="48"
                py="2"
                text="Publish user"
              >
                <HiOutlineSave className="text-xl dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>

          {/* Add Product section here  */}
          <div className="grid grid-cols-2 px-4 pt-8 pb-8 sm:px-6 lg:px-8 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                User information
              </h3>

              <div className="flex flex-col gap-5 mt-4">
                <InputWithLabel label="Name">
                  <SimpleInput type="text" placeholder="Enter a name..." />
                </InputWithLabel>

                <InputWithLabel label="Lastname">
                  <SimpleInput type="text" placeholder="Enter a lastname..." />
                </InputWithLabel>

                <InputWithLabel label="Email">
                  <SimpleInput type="text" placeholder="Enter a email ..." />
                </InputWithLabel>

                <InputWithLabel label="Password">
                  <SimpleInput
                    type="password"
                    placeholder="Enter a password..."
                  />
                </InputWithLabel>

                <InputWithLabel label="Confirm password">
                  <SimpleInput
                    type="password"
                    placeholder="Enter a confirm password..."
                  />
                </InputWithLabel>

                <InputWithLabel label="Select role">
                  <SelectInput selectList={roles} />
                </InputWithLabel>
              </div>
            </div>

            {/* right div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Upload user image
              </h3>
              {/* <ImageUpload /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateUser;
