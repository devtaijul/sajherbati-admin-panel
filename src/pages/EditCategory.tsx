import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineSave } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
  TextAreaInput,
} from "../components";
import SelectInput from "../components/SelectInput";
import { selectList } from "../utils/data";

const EditCategory = () => {
  const [inputObject, setInputObject] = useState({
    title: "PC",
    description: "This is a category for all computers.",
    slug: "pc",
    parentCategory: "",
    metaTitle: "PC category",
    metaDescription: "This is a category for all computers.",
  });

  return (
    <div className="flex h-auto border-t border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="w-full dark:bg-blackPrimary bg-whiteSecondary ">
        <div className="py-10 dark:bg-blackPrimary bg-whiteSecondary">
          <div className="flex items-center justify-between px-4 pb-8 border-b border-gray-800 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Edit category
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button className="flex items-center justify-center w-48 py-2 text-lg duration-200 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary dark:hover:border-gray-500 hover:border-gray-400 gap-x-2">
                <AiOutlineSave className="text-xl dark:text-whiteSecondary text-blackPrimary" />
                <span className="font-medium dark:text-whiteSecondary text-blackPrimary">
                  Save draft
                </span>
              </button>
              <Link
                to="/categories/add-category"
                className="flex items-center justify-center w-48 py-2 text-lg duration-200 dark:bg-whiteSecondary bg-blackPrimary dark:hover:bg-white hover:bg-blackSecondary gap-x-2"
              >
                <HiOutlineSave className="text-xl dark:text-blackPrimary text-whiteSecondary" />
                <span className="font-semibold dark:text-blackPrimary text-whiteSecondary">
                  Update category
                </span>
              </Link>
            </div>
          </div>

          {/* Add Category section here  */}
          <div className="grid grid-cols-2 px-4 pt-8 pb-8 sm:px-6 lg:px-8 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Basic information
              </h3>

              <div className="flex flex-col gap-5 mt-4">
                <InputWithLabel label="Category title">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a category title..."
                    value={inputObject.title}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, title: e.target.value })
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Category description">
                  <TextAreaInput
                    placeholder="Enter a category description..."
                    rows={4}
                    cols={50}
                    value={inputObject.description}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        description: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Category slug">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a category slug..."
                    value={inputObject.slug}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, slug: e.target.value })
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Parent category (optional)">
                  <SelectInput
                    selectList={selectList}
                    value={inputObject.parentCategory}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        parentCategory: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
              </div>
              <h3 className="mt-16 text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackSecondary">
                SEO
              </h3>
              <div className="flex flex-col gap-5 mt-4">
                <InputWithLabel label="Meta title">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a meta title..."
                    value={inputObject.metaTitle}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, title: e.target.value })
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Meta description">
                  <TextAreaInput
                    placeholder="Enter a meta description..."
                    rows={4}
                    cols={50}
                    value={inputObject.metaDescription}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        description: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
              </div>
            </div>

            {/* right div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Category image
              </h3>

              {/* <ImageUpload /> */}

              <div className="flex flex-wrap justify-center mt-5 gap-x-2">
                <img
                  src="/src/assets/tablet (1).jpg"
                  alt=""
                  className="h-32 w-36"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditCategory;
