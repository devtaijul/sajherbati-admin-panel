import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineSave } from "react-icons/hi";
import {
  ImageUpload,
  InputWithLabel,
  Sidebar,
  TextAreaInput,
} from "../components";
import SelectInput from "../components/SelectInput";
import SimpleInput from "../components/SimpleInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ProductSchema, productSchema } from "../utils/validation";
import SwitchToggle from "../components/SwitchToggle";
import ColorPicker from "../components/ColorPicker";
import KeywordInput from "../components/KeywordInput";
import React from "react";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  const [featuredImage, setFeaturedImage] = React.useState<string[]>([]);
  const [galleryImages, setGalleryImages] = React.useState<string[]>([]);

  const stitchType = watch("stitchType");

  const onSubmit = (data: ProductSchema) => {
    console.log("PRODUCT DATA 👉", data);
  };

  return (
    <div className="flex h-auto border-t border-blackSecondary dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full py-10 dark:bg-blackPrimary bg-whiteSecondary"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-8 border-b border-gray-800 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold dark:text-whiteSecondary">
            Add new product
          </h2>

          <div className="flex gap-2">
            <button type="button" className="btn-outline">
              <AiOutlineSave /> Save draft
            </button>

            <button type="submit" className="btn-primary">
              <HiOutlineSave /> Publish product
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-10 px-4 pt-8 sm:px-6 lg:px-8 max-xl:grid-cols-1">
          {/* LEFT */}
          <div>
            <h3 className="section-title">Basic information</h3>

            <InputWithLabel label="Title">
              <SimpleInput {...register("title")} />
              {errors.title && (
                <p className="error">{String(errors.title.message)}</p>
              )}
            </InputWithLabel>

            <InputWithLabel label="Category">
              <SelectInput
                {...register("categoryId")}
                selectList={[
                  { value: "1", label: "Category 1" },
                  { value: "2", label: "Category 2" },
                ]}
              />
            </InputWithLabel>

            {/* Stitch Type */}
            <InputWithLabel label="Product Type">
              <SelectInput
                {...register("stitchType")}
                selectList={[
                  { value: "STITCH", label: "Stitch" },
                  { value: "UNSTITCH", label: "Unstitch" },
                ]}
              />
            </InputWithLabel>

            {/* Related Product */}
            {stitchType && (
              <InputWithLabel label="Connect with other variant (optional)">
                <select {...register("relatedProductId")} className="input">
                  <option value="">None</option>
                  {/* Load product list here */}
                </select>
              </InputWithLabel>
            )}

            {/* Pricing */}
            <h3 className="mt-16 section-title">Pricing & Inventory</h3>

            <div className="grid grid-cols-2 gap-5">
              <InputWithLabel label="Base price">
                <SimpleInput type="number" {...register("regularPrice")} />
              </InputWithLabel>

              <InputWithLabel label="Discount price">
                <SimpleInput type="number" {...register("price")} />
              </InputWithLabel>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <InputWithLabel label="Stock">
                <SelectInput
                  {...register("categoryId")}
                  selectList={[
                    { value: "1", label: "In Stock" },
                    { value: "0", label: "Out of Stock" },
                  ]}
                />
              </InputWithLabel>

              <InputWithLabel label="SKU">
                <SimpleInput {...register("sku")} />
              </InputWithLabel>
            </div>
            <h3 className="mt-16 section-title">Additional Details</h3>

            <div className="flex flex-col gap-6">
              {/* Switches */}
              <SwitchToggle
                label="Top Selling"
                register={register("isTopSelling")}
              />
              <SwitchToggle
                label="New Arrival"
                register={register("newArrival")}
              />
              <SwitchToggle
                label="Custom Relation"
                register={register("isCustomeRelation")}
              />
              <SwitchToggle label="In Stock" register={register("inStock")} />

              {/* Color */}
              <InputWithLabel label="Color">
                <ColorPicker register={register("color")} />
              </InputWithLabel>

              {/* Manufacturer */}
              <InputWithLabel label="Manufacturer (optional)">
                <SimpleInput {...register("manufacturer")} />
              </InputWithLabel>

              {/* Display Priority */}
              <InputWithLabel label="Display Priority">
                <SelectInput
                  {...register("displayPriority")}
                  selectList={[
                    { label: "Default (0)", value: "0" },
                    ...Array.from({ length: 20 }).map((_, i) => ({
                      label: String(i + 1),
                      value: String(i + 1),
                    })),
                  ]}
                />
              </InputWithLabel>

              {/* Keywords */}
              <InputWithLabel label="Keywords">
                <KeywordInput
                  value={watch("keywords")}
                  onChange={(val: string[]) => setValue("keywords", val)}
                />
              </InputWithLabel>

              {/* Measurements */}
              <InputWithLabel label="Body">
                <SimpleInput {...register("body")} />
              </InputWithLabel>

              <InputWithLabel label="Length">
                <SimpleInput {...register("long")} />
              </InputWithLabel>

              <InputWithLabel label="Pant Length">
                <SimpleInput {...register("pantLong")} />
              </InputWithLabel>

              <InputWithLabel label="Inner & Salwar">
                <SimpleInput {...register("innerAndSalwar")} />
              </InputWithLabel>

              <InputWithLabel label="Live Link">
                <SimpleInput {...register("liveLink")} />
              </InputWithLabel>

              {/* Video */}
              <InputWithLabel label="Product Video">
                <SimpleInput {...register("liveLink")} />
              </InputWithLabel>

              <InputWithLabel label="Description">
                <ReactQuill
                  theme="snow"
                  className="bg-white dark:bg-blackPrimary dark:text-white text-blackPrimary"
                  onChange={(val) => setValue("description", val)}
                />
              </InputWithLabel>

              <InputWithLabel label="Instruction">
                <ReactQuill
                  theme="snow"
                  className="bg-white dark:bg-blackPrimary dark:text-white text-blackPrimary"
                  onChange={(val) => setValue("instruction", val)}
                />
              </InputWithLabel>
            </div>
            {/* SEO SECTION */}
            <div>
              <h3 className="mt-16 text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                SEO
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                These settings help your product appear better in search
                engines.
              </p>

              <div className="flex flex-col gap-5 mt-4">
                {/* Meta Title */}
                <InputWithLabel label="Meta title">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a meta title (max 70 characters)"
                    {...register("seoTitle")}
                  />
                  {errors.seoTitle && (
                    <p className="mt-1 text-xs text-red-500">
                      {String(errors.seoTitle.message)}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    {watch("seoTitle")?.length || 0} / 70 characters
                  </p>
                </InputWithLabel>

                {/* Meta Description */}
                <InputWithLabel label="Meta description">
                  <TextAreaInput
                    placeholder="Enter a meta description (max 160 characters)"
                    rows={4}
                    {...register("seoDescription")}
                  />
                  {errors.seoDescription && (
                    <p className="mt-1 text-xs text-red-500">
                      {String(errors.seoDescription.message)}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    {watch("seoDescription")?.length || 0} / 160 characters
                  </p>
                </InputWithLabel>
              </div>

              {/* SEO Preview */}
              <div className="p-4 mt-6 border border-gray-700 rounded-md">
                <p className="text-sm font-medium text-blue-600">
                  {watch("seoTitle") || "SEO title preview"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {watch("seoDescription") ||
                    "SEO description preview will appear here."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="section-title">Product images</h3>
            <ImageUpload
              onSelect={(value) => {
                setFeaturedImage(value);
              }}
              label="Featured Image"
              selectedImageIds={featuredImage}
              previewPosition="outside"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
