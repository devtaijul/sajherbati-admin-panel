import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineSave } from "react-icons/hi";
import {
  ImageUpload,
  InputWithLabel,
  Sidebar,
  SimpleInput,
  TextAreaInput,
} from "../components";
import { FlatCategory } from "../components/FlatCategory";
import { createCategoryMutation } from "../resolvers/mutation";
import { categorySchema, CategorySchema } from "../utils/validation";

const CreateCategory = () => {
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      parentCategoryId: "",
      seoTitle: "",
      seoDescription: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: createCategoryMutation,
  });

  const onSubmit = (data: CategorySchema) => {
    const payload = {
      ...data,
      featuredImageId: selectedImageIds[0],
      parentId: data.parentCategoryId || null,
    };

    console.log("CATEGORY DATA 👉", payload);

    mutate(
      {
        category: payload,
      },
      {
        onSuccess: () => {
          reset();
          setSelectedImageIds([]);
        },
        onError: (error: any) => {
          console.error("Failed to create category:", error);
        },
      },
    );
  };

  const generatedSlug = `${watch("title")?.toLowerCase().replace(/ /g, "-")}`;

  useEffect(() => {
    setValue("slug", generatedSlug);
  }, [generatedSlug, setValue]);

  return (
    <div className="flex h-auto border-t border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="w-full dark:bg-blackPrimary bg-whiteSecondary ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-10 dark:bg-blackPrimary bg-whiteSecondary"
        >
          <div className="flex items-center justify-between px-4 pb-8 border-b border-gray-800 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Add new category
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              {/*  <button
                disabled={isPending}
                type="submit"
                className="flex items-center justify-center w-48 py-2 text-lg duration-200 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary dark:hover:border-gray-500 hover:border-gray-400 gap-x-2"
              >
                <AiOutlineSave className="text-xl dark:text-whiteSecondary text-blackPrimary" />
                <span className="font-medium dark:text-whiteSecondary text-blackPrimary">
                  Save draft
                </span>
              </button> */}
              <button
                disabled={isPending}
                type="submit"
                className="flex items-center justify-center w-48 py-2 text-lg duration-200 dark:bg-whiteSecondary bg-blackPrimary dark:hover:bg-white hover:bg-black gap-x-2"
              >
                <HiOutlineSave className="text-xl dark:hover:text-blackPrimary hover:text-whiteSecondary dark:text-blackPrimary text-whiteSecondary" />
                <span className="font-semibold dark:text-blackPrimary text-whiteSecondary">
                  {isPending ? "Publishing..." : "Publish category"}
                </span>
              </button>
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
                    placeholder="Enter a category title..."
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="error">{errors.title.message}</p>
                  )}
                </InputWithLabel>

                <InputWithLabel label="Category description">
                  <TextAreaInput
                    placeholder="Enter a category description..."
                    rows={4}
                    {...register("description")}
                  />
                </InputWithLabel>

                <InputWithLabel label="Category slug">
                  <SimpleInput
                    placeholder="enter-category-slug"
                    {...register("slug")}
                  />
                  {errors.slug && (
                    <p className="error">{errors.slug.message}</p>
                  )}
                </InputWithLabel>

                <FlatCategory
                  selectedCategoryId={watch("parentCategoryId")}
                  onChange={(e) => setValue("parentCategoryId", e.target.value)}
                />
              </div>
              <h3 className="mt-16 text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                SEO
              </h3>
              <div className="flex flex-col gap-5 mt-4">
                <InputWithLabel label="Meta title">
                  <SimpleInput {...register("seoTitle")} />
                </InputWithLabel>

                <InputWithLabel label="Meta description">
                  <TextAreaInput rows={4} {...register("seoDescription")} />
                </InputWithLabel>
              </div>
            </div>

            {/* right div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Category image
              </h3>

              <ImageUpload
                selectedImageIds={selectedImageIds}
                onSelect={(ids) => setSelectedImageIds(ids)}
                showPreview
                label="Featured Image"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateCategory;
