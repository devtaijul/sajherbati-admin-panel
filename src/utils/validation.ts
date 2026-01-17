import { z } from "zod";

export const productSchema = z
  .object({
    /* ================= BASIC ================= */
    title: z.string().min(3, "Title is required").max(150),

    categoryId: z.string().min(1, "Category is required"),

    stitchType: z.enum(["STITCH", "UNSTITCH"]),

    relatedProductId: z.string().optional(),

    /* ================= VARIANT ================= */
    sizes: z.array(z.string()).optional(),

    /* ================= PRICING ================= */
    regularPrice: z.coerce.number().min(0),
    price: z.coerce.number().min(0),

    /* ================= STOCK ================= */
    inStock: z.boolean().default(true),
    sku: z.string().optional(),

    /* ================= FLAGS ================= */
    isTopSelling: z.boolean().default(false),
    newArrival: z.boolean().default(false),
    isCustomeRelation: z.boolean().default(false),

    /* ================= VISUAL ================= */
    color: z.string().optional(),
    manufacturer: z.string().optional(),

    displayPriority: z.string().optional(),

    /* ================= KEYWORDS ================= */
    keywords: z.array(z.string()).default([]),

    /* ================= MEASUREMENTS ================= */
    body: z.string().optional(),
    pantLong: z.string().optional(),
    kamizLong: z.string().optional(),
    innerAndSalwar: z.string().optional(),

    /* ================= CONTENT ================= */
    description: z.any(),
    instruction: z.any().optional(),
    videoUrl: z.any().optional(),
    liveLink: z.any().optional(),

    /* ================= SEO ================= */
    seoTitle: z.string().max(70).optional(),
    seoDescription: z.string().max(160).optional(),
  })
  .superRefine((data, ctx) => {
    /* ================= STITCH ================= */
    if (data.stitchType === "STITCH") {
      // sizes required
      if (!data.sizes || data.sizes.length === 0) {
        ctx.addIssue({
          path: ["sizes"],
          message: "At least one body size is required for stitched product",
          code: z.ZodIssueCode.custom,
        });
      }

      // pant length required
      if (!data.pantLong) {
        ctx.addIssue({
          path: ["pantLong"],
          message: "Pant length is required for stitched product",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    /* ================= UNSTITCH ================= */
    if (data.stitchType === "UNSTITCH") {
      // body required
      if (!data.body) {
        ctx.addIssue({
          path: ["body"],
          message: "Body measurement is required for unstitch product",
          code: z.ZodIssueCode.custom,
        });
      }

      // inner & salwar required
      if (!data.innerAndSalwar) {
        ctx.addIssue({
          path: ["innerAndSalwar"],
          message: "Inner & Salwar is required for unstitch product",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type ProductSchema = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  title: z
    .string()
    .min(2, "Category title is required")
    .max(100, "Title too long"),

  description: z.string().optional(),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),

  parentCategoryId: z.string().optional(),

  featuredImage: z.string().optional(),

  seoTitle: z.string().max(70, "Max 70 characters").optional(),

  seoDescription: z.string().max(160, "Max 160 characters").optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
