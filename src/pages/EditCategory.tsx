import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { HiOutlineSave } from "react-icons/hi";

import {
  ImageUpload,
  InputWithLabel,
  Sidebar,
  SimpleInput,
  TextAreaInput,
} from "../components";
import { FlatCategory } from "../components/FlatCategory";
import { categorySchema, CategorySchema } from "../utils/validation";
import { getCategoryById } from "../services/category.api";
import { updateCategoryMutation } from "../resolvers/mutation";

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  console.log("selectedImagId", selectedImageIds);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });

  /* ================= GET CATEGORY ================= */
  const { isLoading: isFetching, data: existingCategory } = useQuery({
    queryKey: ["category", id],
    enabled: !!id,
    queryFn: () => getCategoryById(id!),
  });

  /* ================= PREFILL FORM ================= */
  useEffect(() => {
    if (!existingCategory?.data) return;

    const c = existingCategory.data;

    reset({
      title: c.title,
      description: c.description ?? "",
      slug: c.slug,
      parentCategoryId: c.parentId ?? "",
      seoTitle: c.seoTitle ?? "",
      seoDescription: c.seoDescription ?? "",
    });

    if (c.featuredImageId) {
      setSelectedImageIds([c.featuredImageId]);
    }
  }, [existingCategory, reset]);

  /* ================= UPDATE CATEGORY ================= */
  const { mutate, isPending } = useMutation({
    mutationKey: ["update-category", id],
    mutationFn: updateCategoryMutation,
  });

  const onSubmit = (data: CategorySchema) => {
    const payload = {
      ...data,
      parentId: data.parentCategoryId || null,
      featuredImageId: selectedImageIds[0] || null,
    };

    mutate(
      { id: id!, category: payload },
      {
        onSuccess: () => {
          console.log("Category updated successfully");
        },
      },
    );
  };

  if (isFetching) return <p className="p-5">Loading...</p>;

  return (
    <div className="flex h-auto border-t border-blackSecondary dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />

      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="py-10">
          {/* HEADER */}
          <div className="flex items-center justify-between px-8 pb-8 border-b border-gray-800">
            <h2 className="text-3xl font-bold">Edit category</h2>

            <button
              disabled={isPending}
              type="submit"
              className="flex items-center justify-center w-48 py-2 text-lg dark:bg-whiteSecondary bg-blackPrimary gap-x-2"
            >
              <HiOutlineSave className="text-xl" />
              <span>{isPending ? "Updating..." : "Update category"}</span>
            </button>
          </div>

          {/* BODY */}
          <div className="grid grid-cols-2 px-8 pt-8 gap-x-10 max-xl:grid-cols-1">
            {/* LEFT */}
            <div>
              <h3 className="text-2xl font-bold">Basic information</h3>

              <div className="flex flex-col gap-5 mt-4">
                <InputWithLabel label="Category title">
                  <SimpleInput {...register("title")} />
                  {errors.title && (
                    <p className="error">{errors.title.message}</p>
                  )}
                </InputWithLabel>

                <InputWithLabel label="Category description">
                  <TextAreaInput rows={4} {...register("description")} />
                </InputWithLabel>

                <InputWithLabel label="Category slug">
                  <SimpleInput {...register("slug")} />
                  {errors.slug && (
                    <p className="error">{errors.slug.message}</p>
                  )}
                </InputWithLabel>

                <FlatCategory
                  selectedCategoryId={watch("parentCategoryId")}
                  onChange={(e) => setValue("parentCategoryId", e.target.value)}
                />
              </div>

              {/* SEO */}
              <h3 className="mt-16 text-2xl font-bold">SEO</h3>

              <div className="flex flex-col gap-5 mt-4">
                <InputWithLabel label="Meta title">
                  <SimpleInput {...register("seoTitle")} />
                </InputWithLabel>

                <InputWithLabel label="Meta description">
                  <TextAreaInput rows={4} {...register("seoDescription")} />
                </InputWithLabel>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <h3 className="text-2xl font-bold">Category image</h3>

              <ImageUpload
                selectedImageIds={selectedImageIds}
                onSelect={setSelectedImageIds}
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

export default EditCategory;
