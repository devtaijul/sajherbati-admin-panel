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
import { Controller, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ColorPicker from "../components/ColorPicker";
import KeywordInput from "../components/KeywordInput";
import { ParentToChildCategorySelector } from "../components/ParentToChildCategorySelector";
import ProductRelationSelector from "../components/ProductRelationSelector";
import SizeSelector from "../components/SizeSelector";
import SwitchToggle from "../components/SwitchToggle";
import { createProductMutation } from "../resolvers/mutation";
import { ProductSchema, productSchema } from "../utils/validation";
import { Product } from "../vite-env";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      displayPriority: "0",
      isTopSelling: false,
      newArrival: false,
      isCustomeRelation: false,
      sizes: [],
      inStock: true,
      slug: "",
      title: "",
      stitchType: "STITCH",
    },
  });
  const [featuredImage, setFeaturedImage] = useState<string[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [attachProduct, setAttachProduct] = useState<Product[]>([]);
  const [openAttachProduct, setOpenAttachProduct] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProductMutation,
  });

  const stitchType = watch("stitchType");
  const displayPriority = watch("displayPriority");

  const onSubmit = (data: ProductSchema) => {
    const variables = {
      ...data,
      featuredImageId: featuredImage[0],
      galleryImageIds: galleryImages,
      relatedProductIds: relatedProducts.map((product) => product.id),
      attachProductId: attachProduct.length > 0 ? attachProduct[0].id : null,
    };

    mutate(
      {
        product: variables,
      },
      {
        onSuccess: () => {
          console.log("Product created successfully");
          toast.success("Product created successfully");
          reset();
          setFeaturedImage([]);
          setGalleryImages([]);
          setRelatedProducts([]);
          setAttachProduct([]);
        },
        onError: () => {
          toast.error("Failed to create product");
        },
      },
    );
  };

  const generatedSlug = `${watch("title")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")}`;

  useEffect(() => {
    setValue("slug", generatedSlug);
  }, [setValue, generatedSlug]);

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
            {/* <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md btn-primary dark:bg-white"
            >
              <AiOutlineSave /> Save draft
            </button> */}

            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md btn-primary dark:bg-white"
            >
              <HiOutlineSave />{" "}
              {isPending ? "Publishing..." : "Publish product"}
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
            <InputWithLabel label="Slug">
              <SimpleInput {...register("slug")} />
              {errors.slug && (
                <p className="error">{String(errors.slug.message)}</p>
              )}
            </InputWithLabel>

            <InputWithLabel label="Category">
              <ParentToChildCategorySelector
                selectedValue={watch("categoryId")}
                setValue={(value) => setValue("categoryId", value)}
              />
            </InputWithLabel>

            {/* Stitch Type */}
            <InputWithLabel label="Product Type">
              <SelectInput
                value={stitchType}
                defaultValue="STITCH"
                onChange={(event) => {
                  setValue(
                    "stitchType",
                    event.target.value as "STITCH" | "UNSTITCH",
                  );
                }}
                selectList={[
                  { value: "STITCH", label: "Stitch" },
                  { value: "UNSTITCH", label: "Unstitch" },
                ]}
              />
            </InputWithLabel>

            {/* Related Product */}
            <div className="mt-4"></div>
            <SwitchToggle
              label="Open attach  product"
              className="mt-4"
              register={{
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  setOpenAttachProduct(event.target.checked);
                },
              }}
            />

            {openAttachProduct && (
              <InputWithLabel label="Attach product">
                <ProductRelationSelector
                  value={attachProduct}
                  onChange={setAttachProduct}
                  multiple={false}
                />
              </InputWithLabel>
            )}

            {/* Pricing */}
            <h3 className="mt-16 section-title">Pricing & Inventory</h3>

            <div className="grid grid-cols-2 gap-5">
              <InputWithLabel label="Base price">
                <SimpleInput
                  type="number"
                  {...register("regularPrice")}
                  min={0}
                />
              </InputWithLabel>

              <InputWithLabel label="Discount price">
                <SimpleInput type="number" {...register("price")} />
              </InputWithLabel>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <InputWithLabel label="SKU">
                <SimpleInput {...register("sku")} />
              </InputWithLabel>
            </div>

            {watch("stitchType") === "STITCH" && (
              <div>
                <Controller
                  name="sizes"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <SizeSelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.sizes && (
                  <p className="error">{errors.sizes.message}</p>
                )}
              </div>
            )}

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
              {watch("isCustomeRelation") && (
                <InputWithLabel label="Custom Relation">
                  <ProductRelationSelector
                    value={relatedProducts}
                    onChange={setRelatedProducts}
                    multiple={true}
                  />
                </InputWithLabel>
              )}
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
                  value={displayPriority}
                  defaultValue={displayPriority}
                  onChange={(event) => {
                    setValue("displayPriority", event.target.value);
                  }}
                  selectList={[
                    { label: "Default (0)", value: "0" },
                    ...Array.from({ length: 20 }).map((_, i) => ({
                      label: `${i + 1}`,
                      value: `${i + 1}`,
                    })),
                  ]}
                />
              </InputWithLabel>

              {/* Keywords */}
              <InputWithLabel label="Keywords">
                <KeywordInput
                  value={watch("keywords") as string[]}
                  onChange={(val: string[]) => setValue("keywords", val)}
                />
              </InputWithLabel>

              {/* Measurements */}
              {stitchType === "UNSTITCH" && (
                <InputWithLabel label="Body">
                  <SimpleInput {...register("body")} />
                  {errors.body && (
                    <p className="error">{errors.body.message}</p>
                  )}
                </InputWithLabel>
              )}

              <InputWithLabel label="Kamiz Length">
                <SimpleInput {...register("kamizLong")} />
              </InputWithLabel>

              {stitchType === "STITCH" && (
                <InputWithLabel label="Pant Length">
                  <SimpleInput {...register("pantLong")} />
                  {errors.pantLong && (
                    <p className="error">{errors.pantLong.message}</p>
                  )}
                </InputWithLabel>
              )}

              {stitchType === "UNSTITCH" && (
                <InputWithLabel label="Inner & Salwar">
                  <SimpleInput {...register("innerAndSalwar")} />
                  {errors.innerAndSalwar && (
                    <p className="error">{errors.innerAndSalwar.message}</p>
                  )}
                </InputWithLabel>
              )}

              <InputWithLabel label="Live Link">
                <SimpleInput {...register("liveLink")} />
              </InputWithLabel>

              {/* Video */}
              <InputWithLabel label="Product Video">
                <SimpleInput {...register("videoUrl")} />
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
            <ImageUpload
              onSelect={(value) => {
                setGalleryImages(value);
              }}
              label="Gallery Images"
              selectedImageIds={galleryImages}
              previewPosition="outside"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
